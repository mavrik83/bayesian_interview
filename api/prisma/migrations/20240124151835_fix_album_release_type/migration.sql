/*
  Warnings:

  - You are about to alter the column `release_date` on the `albums` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_albums" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "artist_id" INTEGER,
    CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_albums" ("artist_id", "id", "name", "price", "release_date") SELECT "artist_id", "id", "name", "price", "release_date" FROM "albums";
DROP TABLE "albums";
ALTER TABLE "new_albums" RENAME TO "albums";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
