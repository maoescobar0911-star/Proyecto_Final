CREATE DATABASE IF NOT EXISTS planeador_dietas;
USE planeador_dietas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(120) NOT NULL,
  altura DECIMAL(3,2) NOT NULL,
  peso_actual DECIMAL(5,2) NOT NULL DEFAULT 70.00,
  objetivo_personal ENUM('Bajar peso', 'Mantener peso', 'Ganar masa') NOT NULL DEFAULT 'Mantener peso'
);

CREATE TABLE IF NOT EXISTS dietas (
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

CREATE TABLE IF NOT EXISTS seguimiento_peso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  peso DECIMAL(5,2) NOT NULL,
  nota VARCHAR(180) DEFAULT '',
  fecha_registro DATE NOT NULL,
  CONSTRAINT fk_progreso_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS altura DECIMAL(3,2) NOT NULL DEFAULT 1.70;

ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS peso_actual DECIMAL(5,2) NOT NULL DEFAULT 70.00;

ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS objetivo_personal ENUM('Bajar peso', 'Mantener peso', 'Ganar masa') NOT NULL DEFAULT 'Mantener peso';
