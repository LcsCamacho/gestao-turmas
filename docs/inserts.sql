
insert into professor(id,nome,email, password) values (1,'Lucas Camacho','professor@saep.com', '123456');
insert into professor(id,nome,email, password) values (2,'Wellington Camacho','professor2@saep.com', '123456');
insert into professor(id,nome,email, password) values (3,'Reenye Camacho','professor3@saep.com', '123456');

insert into turma(id,nome, professorId) values (1,'Turma 1', 2);
insert into turma(id,nome, professorId) values (2,'Turma 2', 2);
insert into turma(id,nome, professorId) values (3,'Turma 3', 2);

insert into atividade(id,titulo, descricao, turmaId) values (1,'Atividade 1', 'Atividade 1', 1);
insert into atividade(id,titulo, descricao, turmaId) values (2,'Atividade 2', 'Atividade 2', 1);
insert into atividade(id,titulo, descricao, turmaId) values (3,'Atividade 3', 'Atividade 3', 1);


