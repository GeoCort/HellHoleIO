/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "url" TEXT,
ALTER COLUMN "name" SET DEFAULT 'untitled';

-- CreateIndex
CREATE UNIQUE INDEX "Folder_userId_key" ON "Folder"("userId");
