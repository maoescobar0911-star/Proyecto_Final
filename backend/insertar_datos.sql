CREATE DATABASE IF NOT EXISTS planeador_dietas;
USE planeador_dietas;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS dietas;
DROP TABLE IF EXISTS usuarios;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(120) NOT NULL
);

CREATE TABLE dietas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  objetivo ENUM('Definicion', 'Mantenimiento', 'Volumen') NOT NULL DEFAULT 'Mantenimiento',
  total_calorias INT NOT NULL,
  completada TINYINT(1) NOT NULL DEFAULT 0,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_dietas_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

INSERT INTO usuarios (nombre, email, password)
VALUES
  ('Maria Escobar', 'maria@test.com', '123456'),
  ('Invitado Demo', 'demo@test.com', '123456');

INSERT INTO dietas (usuario_id, nombre, descripcion, objetivo, total_calorias, completada)
VALUES
  (1, 'Plan balanceado semanal', 'Desayuno con avena, almuerzo con pollo y cena ligera con ensalada.', 'Mantenimiento', 2100, 0),
  (1, 'Definicion ligera', 'Enfocada en proteina alta, vegetales y control de carbohidratos.', 'Definicion', 1800, 0),
  (2, 'Volumen limpio', 'Superavit moderado con arroz, pollo, huevos y frutas.', 'Volumen', 2800, 1);
