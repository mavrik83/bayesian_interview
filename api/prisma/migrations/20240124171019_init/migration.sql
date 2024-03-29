-- CreateTable
CREATE TABLE "artists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "albums" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "artist_id" INTEGER,
    CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist_id" INTEGER,
    "albumId" INTEGER,
    CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
