# Planeador de Dietas

Proyecto estudiantil desarrollado como avance de proyecto final. La aplicacion permite registrar usuarios, iniciar sesion y administrar planes de dieta con objetivo, calorias y descripcion.

## Estado actual

En esta entrega ya se puede:

- registrar usuarios
- iniciar sesion
- crear dietas
- editar dietas
- marcar dietas como completadas
- eliminar dietas
- trabajar con backend y MySQL
- seguir funcionando en modo local si el backend falla durante la demo

## Tecnologias usadas

- Vue 3
- Vite
- Vue Router
- Node.js
- Express
- MySQL
- DBeaver o MySQL Workbench para gestionar la base de datos

## Estructura del proyecto

- `frontend-vue`: interfaz del sistema
- `backend`: API, conexion a MySQL y script SQL inicial

## Como ejecutar el proyecto

### 1. Base de datos

Abrir MySQL en DBeaver o Workbench y ejecutar el archivo:

`backend/insertar_datos.sql`

Ese script crea la base de datos `planeador_dietas`, las tablas principales y algunos datos de prueba.

### 2. Backend

Desde Git Bash:

```bash
cd /c/Users/mauri/Proyecto_Final/backend
npm install
node server.js
```

El backend corre en:

- `http://localhost:3000`
- `http://localhost:3000/api/test`
- `http://localhost:3000/api/dietas?usuario_id=1`

### 3. Frontend

En otra terminal:

```bash
cd /c/Users/mauri/Proyecto_Final/frontend-vue
npm install
npm run dev
```

Luego abrir en el navegador la URL que entregue Vite, normalmente:

`http://localhost:5173`

## Usuarios de prueba

- `maria@test.com` / `123456`
- `demo@test.com` / `123456`

## Flujo para la presentacion

1. Entrar a la pagina principal.
2. Ir a registro o usar un usuario de prueba.
3. Iniciar sesion.
4. Entrar al panel de dietas.
5. Crear una dieta.
6. Editarla.
7. Marcarla como completada.
8. Eliminarla si se quiere mostrar el CRUD completo.

## Nota

El frontend intenta guardar en backend y MySQL. Si el backend no esta disponible, la aplicacion mantiene un modo local para no detener la demostracion.
