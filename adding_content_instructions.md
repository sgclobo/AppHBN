# Guide: Adding New Content to AppHBN

This guide explains where to add new prayers, songs, and devotions to the application.

## 1. Prayers (Orasoens)
Prayers are managed within the main prayers screen file.

*   **File:** `app/(tabs)/orasoens.tsx`
*   **Location:** Look for the `const prayers` object (around line 25).
*   **Format:**
    ```typescript
    "New Prayer Title": {
      id: "unique_id",
      label: "Display Label",
      content: "The prayer text goes here...",
      // Optional: section, has_image, image_description
    },
    ```

## 2. Songs (Kantikus / Knananuk)
Songs are organized into several components based on their category.

*   **Recommended File:** `components/songs_suplementu.ts` (for most new additions).
*   **Format:** Add a new object to the `SONGS_SUPLEMENTU` array:
    ```typescript
    {
      id: 500, // Use the next available number
      category: "Suplementu",
      section: "Tetum",
      title: "SONG TITLE",
      verses: [
        "Verse 1 text...",
        "Verse 2 text..."
      ],
      // Optional: refrain, language
    },
    ```
*   **Note:** All songs are aggregated in `components/songs_data.ts`.

## 3. Devotions (Devosoens)
Devotions are stored in a separate data file.

*   **File:** `components/devosoens_data.ts`
*   **Location:** Modify variables like `oTercoData`, `tercoMisericordiaTetumData`, or `bvsData`.

---

**Note:** Since the content is currently hardcoded in these files, you must specify the exact file and variable mentioned above for the new content to appear in the app.
