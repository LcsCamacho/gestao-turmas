/*
  Warnings:

  - The primary key for the `atividade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `atividade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `turmaId` on the `atividade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `turma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `turma` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `atividade` DROP FOREIGN KEY `Atividade_turmaId_fkey`;

-- AlterTable
ALTER TABLE `atividade` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `turmaId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `turma` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
