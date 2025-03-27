# Backend User API

API REST simple para la gestión de usuarios.

## Características

- CRUD completo para usuarios
- Integración con MongoDB
- Validación de datos

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Crear archivo .env con las siguientes variables:
```
MONGOD_URI=tu_uri_de_mongodb
PORT=3000
```

## Uso

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para iniciar el servidor en modo producción:
```bash
npm start
```

## Endpoints

### Usuarios

- POST /api/users - Crear nuevo usuario
- GET /api/users - Obtener todos los usuarios
- GET /api/users/:id - Obtener un usuario por ID
- PATCH /api/users/:id - Actualizar usuario
- DELETE /api/users/:id - Eliminar usuario

## Ejemplo de uso

### Crear usuario
```json
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "age": 30
}
```

### Actualizar usuario
```json
PATCH http://localhost:3000/api/users/:id
Content-Type: application/json

{
    "name": "John Smith",
    "age": 31
}
```

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- CORS 