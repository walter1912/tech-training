-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN "scopeType" TEXT;

-- CreateTable
CREATE TABLE "ScopeList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "qrcodeId" INTEGER NOT NULL
);
