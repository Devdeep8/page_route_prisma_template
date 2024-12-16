/*
  Warnings:

  - You are about to drop the column `profileURL` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `profileURL` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profileURL`;
