CREATE DATABASE crud_ts;

USE crud_ts;

CREATE TABLE usuarios (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE KEY,
    password VARCHAR(60) NOT NULL,
    img VARCHAR(100) NULL,
    role ENUM('ADMIN_ROLE','USER_ROLE') DEFAULT 'USER_ROLE'
);

CREATE TABLE proyectos (
    proyecto_id INT NOT NULL AUTO_INCREMENT UNIQUE KEY PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE tareas (
    tarea_id INT NOT NULL AUTO_INCREMENT UNIQUE KEY PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE reportes (
    user_id INT NOT NULL UNIQUE KEY PRIMARY KEY,
    fecha DATE NULL,
    hora INT NULL
);

alter table proyectos add foreign key (user_id)  references usuarios (user_id);
alter table tareas add foreign key (user_id)  references usuarios (user_id);
alter table reportes add foreign key (user_id)  references usuarios (user_id);

describe reportes;