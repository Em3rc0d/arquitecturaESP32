# Proyecto Arquitectura 

Link: https://em3rc0d.github.io/arquitecturaESP32/

Este proyecto consiste en un sistema de registro de asistencia utilizando un ESP32 como punto de acceso WiFi y un servidor Node.js para manejar las solicitudes y almacenar los registros en una base de datos PostgreSQL.

##Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Requisitos](#requisitos)
3. [Configuración del ESP32](#configuración-del-esp32)
4. [Configuración del Servidor Node.js](#configuración-del-servidor-nodejs)
5. [Ejecución](#ejecución)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Licencia](#licencia)
## Descripción del Proyecto
El proyecto permite a los usuarios enviar el ID de un alumno a través de una interfaz web. El ESP32 recibe la solicitud y la envía a un servidor Node.js, el cual registra el ID en una base de datos PostgreSQL si el alumno está permitido.
## Requisitos
- ESP32
- Conexión WiFi
- Node.js
- PostgreSQL
## Configuración del ESP32
1. Conectar el ESP32 a la computadora y cargar el código provisto en el archivo `ESP32Code.ino` en el dispositivo.
2. Configurar el ESP32 en modo AP (Access Point) con los detalles de SSID y contraseña proporcionados.
3. Asegurarse de que el ESP32 está escuchando en el puerto 80 para recibir las solicitudes HTTP.
## Configuración del Servidor Node.js
1. Clonar este repositorio y navegar al directorio del proyecto:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd proyecto-arquitectura
    ```
2. Instalar las dependencias necesarias:
    ```bash
    npm install
    ```
3. Configurar la base de datos PostgreSQL y actualizar la configuración en `server.js` con las credenciales de la base de datos.

4. Iniciar el servidor:
    ```bash
    node server.js
     ```
## Ejecución
1. Conectarse a la red WiFi creada por el ESP32 (`AsistenciaESP32`).
2. Abrir el archivo `index.html` en un navegador o acceder a la versión en línea en [em3rc0d.github.io/arquitecturaESP32](https://em3rc0d.github.io/arquitecturaESP32/).
3. Ingresar el ID del alumno y hacer clic en el botón "Enviar al ESP32".
4. Verificar que el ESP32 y el servidor Node.js registren correctamente el ID en la base de datos.
## Estructura del Proyecto
proyecto-arquitectura/
├── index.html
├── server.js
├── ESP32Code.ino
├── README.md
└── package.json
markdown
Copiar código
- `index.html`: Interfaz web para enviar el ID del alumno.
- `server.js`: Código del servidor Node.js.
- `ESP32Code.ino`: Código para el ESP32.
- `README.md`: Documento actual.
- `package.json`: Dependencias del proyecto.
- `asistencia.sql`: Script de creación de la tabla asistencia en PostgreSQL
## Licencia
Este proyecto está bajo la [MIT License](LICENSE).
