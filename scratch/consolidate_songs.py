import re
import os
import subprocess

directory = "/Users/drsergio/Documents/AppHBN/components"
backup_dir = "/Users/drsergio/Documents/AppHBN/components/backup_songs"

def get_git_content(file_rel_path):
    try:
        res = subprocess.run(["git", "show", f"HEAD:components/{file_rel_path}"], capture_output=True, text=True, cwd="/Users/drsergio/Documents/AppHBN")
        if res.returncode == 0:
            return res.stdout
    except:
        pass
    return None

def parse_song_content(content):
    string_re = r'["`](.*?)(?<!\\)["`]'
    starts = [m.start() for m in re.finditer(r'\{\s*id:\s*\d+', content)]
    songs = []
    for i in range(len(starts)):
        start = starts[i]
        end = starts[i+1] if i+1 < len(starts) else content.rfind(']')
        block = content[start:end]
        song = {}
        id_m = re.search(r'id:\s*(\d+)', block)
        title_m = re.search(r'title:\s*' + string_re, block, re.DOTALL)
        cat_m = re.search(r'category:\s*' + string_re, block)
        sec_m = re.search(r'section:\s*' + string_re, block)
        lang_m = re.search(r'language:\s*' + string_re, block)
        ref_m = re.search(r'refrain:\s*' + string_re, block, re.DOTALL)
        if id_m: song["id"] = int(id_m.group(1))
        if title_m: song["title"] = title_m.group(1).strip()
        if cat_m: song["category"] = cat_m.group(1).strip()
        if sec_m: song["section"] = sec_m.group(1).strip()
        if lang_m: song["language"] = lang_m.group(1).strip()
        if ref_m: song["refrain"] = ref_m.group(1).strip()
        verses_m = re.search(r'verses:\s*\[(.*?)\]', block, re.DOTALL)
        if verses_m:
            v_str = verses_m.group(1)
            v_list = re.findall(string_re, v_str, re.DOTALL)
            song["verses"] = [v.strip() for v in v_list]
        if "id" in song: songs.append(song)
    return songs

all_songs = []

# Parse the 4 main ones from Git (before they were messed up)
main_files = ["songs_misa.ts", "songs_tempo_liturgico.ts", "songs_maria_santu.ts", "songs_suplementu.ts"]
for f in main_files:
    content = get_git_content(f)
    if content:
        songs = parse_song_content(content)
        print(f"Parsed {len(songs)} from Git/{f}")
        all_songs.extend(songs)

# Parse the extra ones from backup_songs
for f in os.listdir(backup_dir):
    if f.endswith(".ts"):
        with open(os.path.join(backup_dir, f), "r", encoding="utf-8") as file:
            songs = parse_song_content(file.read())
            print(f"Parsed {len(songs)} from backup/{f}")
            all_songs.extend(songs)

# Deduplicate
def get_content_key(s):
    verses = s.get("verses", [])
    content = "".join(verses)
    return re.sub(r'[^A-Z0-9]', '', content.upper())

verse_seen = {}
for s in all_songs:
    s["title"] = s.get("title", "").upper() # Simple upper for key
    key = get_content_key(s)
    if not key: continue
    if key not in verse_seen:
        verse_seen[key] = s
    else:
        curr = verse_seen[key]
        if len(s.get("title", "")) > len(curr.get("title", "")):
            verse_seen[key] = s

unique_songs = list(verse_seen.values())

# Re-clean titles for the unique set
def clean_title(song):
    title = song.get("title", "").strip()
    verses = song.get("verses", [])
    truncated_markers = ["HA", "NA", "IT", "LA", "NE", "SA", "HANA", "TA", "OH", "AMI", "FO", "MAI", "IT", "HAK", "BA", "NE", "HO", "HI", "DI"]
    if (len(title) <= 4 or title in truncated_markers) and verses:
        first_line = verses[0].split("\n")[0].strip()
        first_line = re.sub(r"^\d+[\.\)]\s*", "", first_line)
        first_line = re.sub(r"[:;,\.\!\?]$", "", first_line)
        words = first_line.split()
        if words:
            return " ".join(words[:6]).upper()
    return title.upper()

for s in unique_songs:
    s["title"] = clean_title(s)

# Sort
def get_order(s):
    c = s.get("category", "")
    if "Misa" in c: return 1
    if "Tempo" in c: return 2
    if "Maria" in c or "Santu" in c: return 3
    if "Suplementu" in c: return 4
    return 5

unique_songs.sort(key=lambda x: (get_order(x), x.get("section", ""), x["title"]))

for i, s in enumerate(unique_songs):
    s["id"] = i + 1

# Write back
misa = [s for s in unique_songs if get_order(s) == 1]
tempo = [s for s in unique_songs if get_order(s) == 2]
maria = [s for s in unique_songs if get_order(s) == 3]
suple = [s for s in unique_songs if get_order(s) >= 4]

def escape_bs(s):
    if not s: return ""
    s = s.replace("`", "\\`").replace("${", "\\${")
    match = re.search(r'(\\+)$', s)
    if match and len(match.group(1)) % 2 != 0:
        s += "\\"
    return s

def write_f(songs, filename):
    with open(os.path.join(directory, filename), "w", encoding="utf-8") as f:
        f.write('import { Song } from "./songs_data";\n\n')
        var = filename.replace(".ts", "").upper()
        f.write(f'export const {var}: Song[] = [\n')
        for s in songs:
            f.write('  {\n')
            f.write(f'    id: {s["id"]},\n')
            f.write(f'    category: "{s["category"]}",\n')
            if "section" in s: f.write(f'    section: "{s["section"]}",\n')
            f.write(f'    title: `{escape_bs(s["title"])}`,\n')
            if "language" in s: f.write(f'    language: "{s["language"]}",\n')
            if "refrain" in s: f.write(f'    refrain: `{escape_bs(s["refrain"])}`,\n')
            f.write('    verses: [\n')
            for v in s.get("verses", []):
                f.write(f'      `{escape_bs(v)}`,\n')
            f.write('    ],\n')
            f.write('  },\n')
        f.write('];\n')

write_f(misa, "songs_misa.ts")
write_f(tempo, "songs_tempo_liturgico.ts")
write_f(maria, "songs_maria_santu.ts")
write_f(suple, "songs_suplementu.ts")

print(f"Final unique count: {len(unique_songs)}")
