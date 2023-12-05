/*
  Warnings:

  - Added the required column `nome` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professor` ADD COLUMN `nome` VARCHAR(191) NOT NULL;
