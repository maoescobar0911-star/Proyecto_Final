# Planeador de Dietas

Este proyecto fue desarrollado como avance del proyecto final. La idea principal es que un usuario pueda registrarse, iniciar sesion y organizar sus dietas de una forma sencilla.

Por ahora el sistema ya permite crear, editar, completar y eliminar dietas. Tambien cuenta con conexion a backend y base de datos MySQL, aunque si algo falla durante la demostracion, el frontend puede seguir funcionando en modo local.

## Herramientas usadas

- Vue 3
- Vite
- Vue Router
- Node.js
- Express
- MySQL

## Carpetas principales

- `frontend-vue`: parte visual del proyecto
- `backend`: servidor, rutas y conexion con la base de datos

## Como ejecutar el proyecto

### Base de datos

Primero hay que abrir MySQL en DBeaver o Workbench y ejecutar el archivo:

`backend/insertar_datos.sql`

Ese script crea la base de datos y deja algunos datos de prueba.

### Backend

En Git Bash:

```bash
cd /c/Users/mauri/Proyecto_Final/backend
npm install
node server.js
```

### Frontend

En otra terminal:

```bash
cd /c/Users/mauri/Proyecto_Final/frontend-vue
npm install
npm run dev
```

Despues abre en el navegador la direccion que te muestre Vite, normalmente:

`http://localhost:5173`

## Usuarios de prueba

- `maria@test.com` / `123456`
- `demo@test.com` / `123456`

## Que se puede mostrar en la exposicion

- registro de usuario
- inicio de sesion
- panel de dietas
- crear dieta
- editar dieta
- marcar dieta como completada
- eliminar dieta

## Nota

La aplicacion intenta trabajar con backend y MySQL. Si el backend no responde, entra en modo local para que la demostracion no se detenga.
