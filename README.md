# Sistema de Login y Registro

Este proyecto implementa un sistema de autenticación completo utilizando Vue.js en el frontend y Laravel en el backend. Permite el registro de usuarios, el inicio de sesión y la visualización de un perfil básico.

## Tabla de Contenidos

*   [Descripción](#descripción)
*   [Tecnologías Utilizadas](#tecnologías-utilizadas)
*   [Pre-requisitos](#pre-requisitos)
*   [Instalación](#instalación)
*   [Uso](#uso)
*   [Endpoints de la API (Backend)](#endpoints-de-la-api-backend)
*   [Licencia](#licencia)

## Descripción

Este proyecto proporciona un sistema de autenticación con registro, inicio de sesión y visualización de un perfil de usuario. Utiliza Laravel Sanctum para la autenticación basada en tokens, lo que lo hace ideal para APIs y aplicaciones de tipo SPA (Single Page Applications). El frontend está construido con Vue.js y Tailwind CSS para una interfaz de usuario moderna y responsiva.

## Tecnologías Utilizadas

*   **Frontend:**
    *   [Vue.js](https://vuejs.org/) (Versión 3)
    *   [Vue Router](https://router.vuejs.org/) (Versión 4)
    *   [Axios](https://axios-http.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:**
    *   [Laravel](https://laravel.com/) (Versión 10 o superior)
    *   [Laravel Sanctum](https://laravel.com/docs/10.x/sanctum)
*   **Base de datos:**
    *   Sqlite

## Pre-requisitos

*   [Node.js](https://nodejs.org/) (Versión 16 o superior)
*   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
*   [PHP](https://www.php.net/) (Versión 8.1 o superior)
*   [Composer](https://getcomposer.org/)

## Instalación

**Frontend:**

1.  Clonar el repositorio:

    ```bash
    git clone [https://github.com/Zprit3/login-app.git](https://github.com/Zprit3/login-app.git)
    cd login-app (o hasta llegar a la raiz del proyecto)
    ```

2.  Instalar las dependencias:

    ```bash
    npm install # o yarn install
    ```

**Backend:**


2.  Instalar las dependencias de Composer:

    ```bash
    composer install
    ```

3.  Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno (especialmente `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` y `APP_URL`):

    ```bash
    cp .env.example .env
    # Editar el archivo .env
    ```

4.  Generar la clave de la aplicación Laravel:

    ```bash
    php artisan key:generate
    ```

5.  Ejecutar las migraciones de la base de datos:

    ```bash
    php artisan migrate
    ```

6.  Enlazar el almacenamiento:
    ```bash
    php artisan storage:link
    ```

## Uso

Para ejecutar el proyecto, necesitas iniciar tanto el frontend como el backend por separado.

**Backend:**

1.  Ejecutar el servidor de desarrollo de Laravel:

    ```bash
    php artisan serve
    ```

    Esto iniciará el servidor en `http://127.0.0.1:8000` (o un puerto diferente si el 8000 está en uso).

**Frontend:**

1.  Abrir una nueva terminal.
2.  Estando aún en la raiz del proyecto:

    ```bash
    cd frontend
    ```

3.  Ejecutar el servidor de desarrollo de Vue:

    ```bash
    npm run dev # o yarn dev
    ```

    Esto iniciará el servidor de desarrollo de Vue, generalmente en `http://localhost:5173`.

Una vez que ambos servidores estén en ejecución, puedes acceder a la aplicación en el navegador a través de la URL del frontend (`http://localhost:5173` en este ejemplo).

## Endpoints de la API (Backend)
                       
Consulta los endpoints en la [hoja de cálculo de Google Sheets](https://docs.google.com/spreadsheets/d/1CT82pf9oPAggfFIEl9wd7-bDjPo2jxibGQqGSxI8Sy4/edit?usp=sharing).

## Licencia

MIT
