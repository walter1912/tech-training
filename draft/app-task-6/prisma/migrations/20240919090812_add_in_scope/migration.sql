/*
  Warnings:

  - You are about to drop the column `qrcodeId` on the `ScopeList` table. All the data in the column will be lost.
  - Added the required column `pricingRuleId` to the `ScopeList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScopeList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "pricingRuleId" INTEGER NOT NULL
);
INSERT INTO "new_ScopeList" ("id", "value") SELECT "id", "value" FROM "ScopeList";
DROP TABLE "ScopeList";
ALTER TABLE "new_ScopeList" RENAME TO "ScopeList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
