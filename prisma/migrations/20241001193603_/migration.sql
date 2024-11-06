/*
  Warnings:

  - You are about to drop the column `url` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userbucketid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentid` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropIndex
DROP INDEX "Folder_userId_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "url",
DROP COLUMN "userId",
ADD COLUMN     "parentid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userbucketid" INTEGER;

-- CreateTable
CREATE TABLE "Bucket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New File',
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownedByid" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userbucketid_key" ON "User"("userbucketid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userbucketid_fkey" FOREIGN KEY ("userbucketid") REFERENCES "Bucket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "Bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_ownedByid_fkey" FOREIGN KEY ("ownedByid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
