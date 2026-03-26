# AppHBN Song Library Guide

This guide explains the modular architecture of the Knananuk (Song) library and provides instructions on how to maintain and expand the collection without breaking the application.

## 📂 Modular Structure

To optimize performance and token limits, the song library is split into multiple modules located in **`app/_components/`**.

### 1. The Central Hub: `songs_data.ts`
This is the single entry point for all song data. 
- **What it does:** It imports all individual song modules and exports a single `SONGS_DATA` array.
- **When to edit:** Only if you create a completely new language file or change the `Song` interface.

### 2. The Data Modules
Each file contains a specific category of songs:
- `songs_misa_tetum.ts`: Main "Misa" category songs in Tetum.
- `songs_misa_latin.ts`: "Misa Latin" category.
- `songs_responsorial.ts`: Specifically for the "Responsorial" section of Misa.
- `songs_other.ts`: "Knananuk Ingles" and "Knananuk Indonesia".

---

## 🏗️ The Song Data Schema

Every song must follow this structure (the `Song` interface):

```typescript
{
  id: number;           // Unique ID for sorting (e.g., 1, 2, 3)
  category: string;     // Grouping (e.g., "Misa", "Misa Latin")
  section: string;      // Sub-grouping (e.g., "Entrada", "Gloria")
  title: string;        // Text shown in the list
  refrain?: string;     // (Optional) Chorus text
  verses: string[];     // Array of individual stanzas
}
```

---

## 🛠️ How to Add a New Song

### Step 1: Identify the File
- If it's a Tetum Misa song, use `songs_misa_tetum.ts`.
- If it's an English song, use `songs_other.ts`.

### Step 2: Create the Object
Add your song to the `SONGS` array in the chosen file. 

> [!IMPORTANT]
> **Pay attention to Category and Section naming!**
> - For **Misa** category: the `section` (e.g., "Entrada") determines which collapsible header it appears under.
> - For **Misa Latin**, **Ingles**, **Indonesia**: the `section` is ignored in the UI, but must still be present in the data (you can use "Default").

**Example Entry:**
```typescript
{
  id: 155,
  category: "Misa",
  section: "Offertório",
  title: "AMI HARASTAT",
  verses: [
    "Ami harastat buat hotu ba Maromak.",
    "Ami hato'o ami laran ba Na'i."
  ]
},
```

### Step 3: Handle Special Characters
If your song text has quotes (`'`), it is best to wrap the string in **backticks (``)** instead of single quotes to avoid syntax errors:
- **Correct:** `verses: [`Ha'u haksolok\`]`
- **Avoid:** `verses: ['Ha'u haksolok']` (The `'` after *Ha* will close the string early and cause an error).

---

## 🚀 Building and Testing
1. **Save your changes** in the `.ts` file.
2. The `songs_data.ts` hub will automatically pick up the new data.
3. Open your terminal and run `npx expo start --web`.
4. Navigate to the **Knananuk** tab to see your new song in the list!

---

## 📋 Best Practices
- **Sorting:** The app automatically sorts songs by their `id`. No need to add them in order in the file, but it's easier to maintain if they are.
- **Memory Limits:** By keeping songs in separate files, we prevent the "Large File" errors that can slow down your editor and the Expo bundler.
- **Backups:** Always `git commit` and `push` after adding a large batch of songs so your work is saved on GitHub!
