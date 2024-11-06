-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_Folderid_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "Folderid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_Folderid_fkey" FOREIGN KEY ("Folderid") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
