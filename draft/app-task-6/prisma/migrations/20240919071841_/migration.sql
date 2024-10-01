/*
  Warnings:

  - You are about to drop the column `createdAt` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `productHandle` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `QRCode` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PricingRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "scopeType" TEXT NOT NULL,
    "customPriceType" TEXT NOT NULL,
    "customPrice" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QRCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scans" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "scopeType" TEXT,
    "name" TEXT,
    "priority" INTEGER,
    "status" TEXT,
    "customPriceType" TEXT,
    "customPrice" INTEGER
);
INSERT INTO "new_QRCode" ("customPrice", "customPriceType", "id", "name", "priority", "scans", "scopeType", "shop", "status") SELECT "customPrice", "customPriceType", "id", "name", "priority", "scans", "scopeType", "shop", "status" FROM "QRCode";
DROP TABLE "QRCode";
ALTER TABLE "new_QRCode" RENAME TO "QRCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
