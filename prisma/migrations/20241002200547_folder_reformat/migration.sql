/*
  Warnings:

  - Added the required column `Bucketid` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Folderid` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "Bucketid" INTEGER NOT NULL,
ADD COLUMN     "Folderid" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_Bucketid_fkey" FOREIGN KEY ("Bucketid") REFERENCES "Bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_Folderid_fkey" FOREIGN KEY ("Folderid") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
