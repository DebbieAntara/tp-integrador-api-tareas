# TP Integrador - API Gestor de Tareas

API RESTful desarrollada con Node.js y Express para gestionar tareas y acciones de mejora.

Este proyecto corresponde al Trabajo Práctico Integrador de Backend. Permite registrar usuarios, iniciar sesión, obtener un token de autenticación y administrar tareas mediante operaciones de creación, consulta, actualización y eliminación.

## Estado del proyecto

El backend funciona localmente y cuenta con:

- Registro seguro de usuarios.
- Contraseñas almacenadas mediante hash.
- Inicio de sesión con JSON Web Token.
- Middleware de autenticación.
- CRUD completo de tareas.
- Validaciones mediante Zod.
- Manejo centralizado de errores.
- Búsquedas sin distinguir mayúsculas y minúsculas.
- Persistencia académica mediante archivos JSON.
- Colección de pruebas para Postman.
- Despliegue en Render pendiente de configuración.

## Tecnologías utilizadas

- Node.js: entorno de ejecución de JavaScript.
- Express: framework para crear la API.
- bcryptjs: generación y comparación del hash de las contraseñas.
- jsonwebtoken: creación y verificación de tokens JWT.
- Zod: validación de los datos recibidos.
- dotenv: lectura de variables de entorno.
- Nodemon: reinicio automático del servidor durante el desarrollo.
- Postman: ejecución y documentación de pruebas de la API.
- Git y GitHub: control de versiones y publicación del código.

## Estructura del proyecto

```text
tp-integrador-api-tareas/
├── backend/
│   ├── controllers/
│   │   ├── health.controller.js
│   │   ├── item.controller.js
│   │   └── user.controller.js
│   ├── data/
│   │   ├── items.json
│   │   └── users.json
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error-handler.middleware.js
│   │   ├── not-found.middleware.js
│   │   └── validate-body.middleware.js
│   ├── models/
│   │   ├── item.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   ├── item.routes.js
│   │   └── user.routes.js
│   ├── schemas/
│   │   ├── item.schema.js
│   │   └── user.schema.js
│   ├── services/
│   │   ├── item.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   ├── json-file.util.js
│   │   └── jwt.util.js
│   ├── app.js
│   └── index.js
├── docs/
│   └── postman/
│       └── TP-Integrador-API-Gestor-de-Tareas.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Responsabilidad de cada carpeta

| Carpeta | Responsabilidad |
| --- | --- |
| `controllers` | Recibe la petición HTTP y construye la respuesta. |
| `routes` | Define las direcciones y métodos disponibles. |
| `services` | Contiene la lógica principal del sistema. |
| `models` | Construye la forma interna de usuarios y tareas. |
| `schemas` | Valida los datos recibidos mediante Zod. |
| `middlewares` | Ejecuta controles antes o después del controlador. |
| `data` | Almacena los datos académicos en archivos JSON. |
| `utils` | Contiene herramientas reutilizables. |

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js 20 o superior.
- npm.
- Git.
- Postman, recomendado para probar la API.

El proyecto fue desarrollado y comprobado en Windows utilizando Visual Studio Code, PowerShell y Node.js 24.

## Instalación

Clonar el repositorio:

```powershell
git clone https://github.com/DebbieAntara/tp-integrador-api-tareas.git
```

Entrar en la carpeta:

```powershell
Set-Location ".\tp-integrador-api-tareas"
```

Instalar las dependencias:

```powershell
npm install
```

## Variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto tomando como referencia `.env.example`.

En PowerShell se puede ejecutar:

```powershell
Copy-Item ".\.env.example" ".\.env"
```

Contenido necesario:

```env
PORT=3000
JWT_SECRET=colocar_aqui_una_clave_larga_y_segura
```

Para generar una clave segura se puede utilizar:

```powershell
node -e "process.stdout.write(require('node:crypto').randomBytes(64).toString('hex'))"
```

La clave generada debe copiarse después de `JWT_SECRET=` dentro del archivo `.env`.

> El archivo `.env` contiene información privada y está excluido de Git mediante `.gitignore`. No debe publicarse en GitHub.

## Ejecución

### Modo de desarrollo

```powershell
npm run dev
```

Nodemon reiniciará automáticamente el servidor cuando detecte cambios en el código.

### Modo normal o producción

```powershell
npm start
```

Resultado esperado:

```text
Servidor funcionando en http://localhost:3000
```

## Verificación de salud

```http
GET /health
```

URL local:

```text
http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "API Gestor de Tareas funcionando correctamente"
}
```

## Endpoints

| Método | Ruta | Autenticación | Descripción |
| --- | --- | ---: | --- |
| `GET` | `/health` | No | Comprueba que la API esté funcionando. |
| `POST` | `/users/register` | No | Registra un usuario con contraseña hasheada. |
| `POST` | `/users/login` | No | Valida las credenciales y entrega un token. |
| `GET` | `/items` | Sí | Lista las tareas del usuario autenticado. |
| `GET` | `/items?search=texto` | Sí | Busca tareas sin distinguir mayúsculas y minúsculas. |
| `POST` | `/items` | Sí | Crea una tarea. |
| `PUT` | `/items/:id` | Sí | Actualiza una tarea del usuario autenticado. |
| `DELETE` | `/items/:id` | Sí | Elimina una tarea del usuario autenticado. |

## Registro de usuario

```http
POST /users/register
```

Cuerpo JSON:

```json
{
  "name": "Usuario Demo",
  "email": "demo@ejemplo.com",
  "password": "ClaveSegura123"
}
```

Resultado esperado:

```text
201 Created
```

La contraseña original no se almacena. El sistema guarda únicamente el hash generado mediante bcryptjs.

Si el correo ya está registrado, la API responde:

```text
409 Conflict
```

## Inicio de sesión

```http
POST /users/login
```

Cuerpo JSON:

```json
{
  "email": "demo@ejemplo.com",
  "password": "ClaveSegura123"
}
```

Resultado esperado:

```text
200 OK
```

La respuesta incluye un token JWT que debe enviarse en las rutas protegidas.

Para evitar revelar si existe o no un correo específico, las credenciales incorrectas reciben un mensaje general:

```text
401 Unauthorized
Correo o contraseña incorrectos
```

## Autenticación con Bearer Token

Las operaciones sobre tareas requieren el encabezado:

```http
Authorization: Bearer TOKEN_GENERADO_EN_LOGIN
```

En Postman se puede utilizar la variable:

```text
{{token}}
```

La solicitud de login incluida en la colección guarda automáticamente el token mediante un script.

## Crear una tarea

```http
POST /items
```

Ejemplo:

```json
{
  "title": "Preparar informe mensual",
  "description": "Consolidar avances y acciones de mejora",
  "status": "pendiente",
  "priority": "alta",
  "dueDate": "2026-08-30"
}
```

Valores permitidos para `status`:

- `pendiente`
- `en_progreso`
- `completada`

Valores permitidos para `priority`:

- `baja`
- `media`
- `alta`

La fecha límite debe utilizar el formato:

```text
YYYY-MM-DD
```

Resultado esperado:

```text
201 Created
```

## Listar y buscar tareas

Listar las tareas del usuario autenticado:

```http
GET /items
```

Buscar por título o descripción:

```http
GET /items?search=INFORME
```

La búsqueda no distingue entre mayúsculas y minúsculas. Por ejemplo, `INFORME`, `Informe` e `informe` producen la misma búsqueda.

## Actualizar una tarea

```http
PUT /items/:id
```

Ejemplo:

```json
{
  "description": "Informe en preparación y revisión",
  "status": "en_progreso",
  "priority": "media"
}
```

Debe enviarse al menos un campo para actualizar.

Resultado esperado:

```text
200 OK
```

Si la tarea no existe o no pertenece al usuario autenticado:

```text
404 Not Found
```

## Eliminar una tarea

```http
DELETE /items/:id
```

Resultado esperado:

```text
200 OK
```

Si la tarea no existe o no pertenece al usuario autenticado:

```text
404 Not Found
```

## Códigos HTTP principales

| Código | Significado |
| ---: | --- |
| `200` | Operación realizada correctamente. |
| `201` | Recurso creado correctamente. |
| `400` | Los datos enviados no son válidos. |
| `401` | Falta el token, es inválido, expiró o las credenciales son incorrectas. |
| `404` | La ruta o el recurso solicitado no existe. |
| `409` | El correo electrónico ya está registrado. |
| `500` | Se produjo un error interno no controlado. |

## Validaciones y manejo de errores

La API controla, entre otros casos:

- Cuerpos JSON mal formados.
- Campos obligatorios faltantes.
- Correos electrónicos inválidos.
- Contraseñas demasiado cortas.
- Correos duplicados.
- Tokens faltantes, inválidos o expirados.
- Títulos demasiado cortos.
- Estados y prioridades no permitidos.
- Fechas con formato incorrecto.
- Actualizaciones vacías.
- Tareas inexistentes.
- Rutas no encontradas.

Las respuestas mantienen una estructura JSON coherente con las propiedades `ok`, `message`, `data` y `errors`, según corresponda.

## Seguridad implementada

- Las contraseñas se procesan mediante bcryptjs.
- La clave JWT se obtiene desde una variable de entorno.
- El archivo `.env` no se publica en GitHub.
- Las rutas de tareas utilizan middleware de autenticación.
- Cada usuario solo puede consultar y modificar sus propias tareas.
- Los datos recibidos se validan antes de llegar a los controladores.
- Los errores de autenticación no revelan información innecesaria.
- Los tokens no se incluyen en la colección exportada de Postman.

## Pruebas con Postman

La colección está disponible en:

```text
docs/postman/TP-Integrador-API-Gestor-de-Tareas.postman_collection.json
```

Para utilizarla:

1. Abrir Postman.
1. Seleccionar `Import`.
1. Importar el archivo JSON de la colección.
1. Verificar la variable:

```text
baseUrl = http://localhost:3000
```

1. Mantener inicialmente vacía la variable `token`.
1. Ejecutar `00 - Verificar API`.
1. Ejecutar `01 - Registrar usuario`.
1. Ejecutar `04 - Iniciar sesión`.
1. Continuar con las solicitudes protegidas.

La colección contiene 18 solicitudes que cubren casos correctos y errores controlados.

## Persistencia de datos

Para el alcance académico del TP, los usuarios y las tareas se guardan en:

```text
backend/data/users.json
backend/data/items.json
```

Esta solución permite demostrar lectura, escritura y persistencia básica sin incorporar todavía una base de datos.

En un sistema empresarial real se recomienda utilizar una base de datos y mecanismos adicionales para manejar concurrencia, respaldos y disponibilidad.

## Despliegue

El proyecto está preparado para ejecutarse mediante:

```powershell
npm start
```

Plataforma prevista:

```text
Render
```

La URL pública será incorporada en este documento después del despliegue.

## Repositorio

```text
https://github.com/DebbieAntara/tp-integrador-api-tareas
```

## Autora

Debbie Antara

Trabajo Práctico Integrador de Backend.
