-- DropForeignKey
ALTER TABLE `atividade` DROP FOREIGN KEY `Atividade_turmaId_fkey`;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
