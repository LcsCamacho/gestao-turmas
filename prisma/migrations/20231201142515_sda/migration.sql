/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `atividade` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `turma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `atividade` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `turma` DROP COLUMN `updatedAt`;
