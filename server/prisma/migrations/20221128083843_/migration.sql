/*
  Warnings:

  - You are about to drop the column `creator_id` on the `Workbook` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Workbook` DROP FOREIGN KEY `FK_User_TO_Workbook_2`;

-- AlterTable
ALTER TABLE `Workbook` DROP COLUMN `creator_id`,
    ADD COLUMN `original_id` BIGINT NULL;

-- CreateIndex
CREATE INDEX `FK_Workbook_To_Workbook` ON `Workbook`(`original_id`);

-- CreateIndex
CREATE FULLTEXT INDEX `Workbook_title_idx` ON `Workbook`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Workbook_description_idx` ON `Workbook`(`description`);

-- AddForeignKey
ALTER TABLE `Workbook` ADD CONSTRAINT `FK_Workbook_To_Workbook` FOREIGN KEY (`original_id`) REFERENCES `Workbook`(`workbook_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
