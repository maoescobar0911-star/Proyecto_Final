-- Script para insertar datos de prueba
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE dieta_alimentos;
TRUNCATE TABLE dietas;
TRUNCATE TABLE alimentos;
TRUNCATE TABLE usuarios;

INSERT INTO usuarios (id, nombre, email, password, peso, altura, objetivo) 
VALUES (1, 'Juan Perez', 'juan@test.com', '123456', 75, 1.75, 'bajar');

INSERT INTO alimentos (id, nombre, calorias, proteinas, grasas, carbohidratos) VALUES
(1, 'Pechuga de pollo', 165, 31, 3.6, 0),
(2, 'Arroz blanco', 130, 2.7, 0.3, 28),
(3, 'Huevo', 155, 13, 11, 1.1),
(4, 'Brócoli', 55, 3.7, 0.6, 11);

INSERT INTO dietas (id, usuario_id, nombre, descripcion, total_calorias) 
VALUES (1, 1, 'Dieta para bajar grasa', 'Comidas balanceadas', 1800);

INSERT INTO dieta_alimentos (dieta_id, alimento_id, cantidad) VALUES
(1, 1, 200),
(1, 2, 150),
(1, 3, 2),
(1, 4, 100);

SET FOREIGN_KEY_CHECKS = 1;