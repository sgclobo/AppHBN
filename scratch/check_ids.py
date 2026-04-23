import re
import os

files = [
    "components/songs_misa.ts",
    "components/songs_tempo_liturgico.ts",
    "components/songs_maria_santu.ts",
    "components/songs_suplementu.ts"
]

for f in files:
    path = os.path.join("/Users/drsergio/Documents/AppHBN", f)
    with open(path, 'r') as file:
        content = file.read()
        ids = re.findall(r'id:\s*(\d+)', content)
        ids = [int(x) for x in ids]
        print(f"{f}: {len(ids)} songs, range {min(ids) if ids else 'N/A'}-{max(ids) if ids else 'N/A'}")
        
        # Check for non-sequential
        for i in range(len(ids) - 1):
            if ids[i+1] != ids[i] + 1:
                print(f"  GAP/JUMP after {ids[i]}: next is {ids[i+1]}")
