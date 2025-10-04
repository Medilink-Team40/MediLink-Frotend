# MediLink-Frontend 🩺✨

<div align="center">

  <img alt="License" src="https://img.shields.io/github/license/anchundiatech/MediLink-Frontend?style=for-the-badge">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/anchundiatech/MediLink-Frontend?style=for-the-badge">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/anchundiatech/MediLink-Frontend?style=for-the-badge&logo=github">

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

</div>


<!--
<div align="center">
  <img src="URL_DEL_LOGO_O_SCREENSHOT" alt="MediLink" width="600"/>
</div>
-->

Documentación del frontend para la plataforma de telemedicina MediLink.

## Índice

1.  [Descripción del Proyecto](#descripción-del-proyecto-️)
2.  [Características Principales](#características-principales-)
3.  [Tecnologías Utilizadas](#tecnologías-utilizadas-)
4.  [Puesta en Marcha](#puesta-en-marcha-)
5.  [Estructura del Proyecto](#estructura-del-proyecto-)
6.  [Scripts Disponibles](#scripts-disponibles-)
7.  [Cómo Contribuir](#cómo-contribuir-)


## Descripción del Proyecto 🗒️

**MediLink** es una plataforma web moderna diseñada para clínicas y centros de salud, con el objetivo de centralizar la gestión de citas, historiales médicos y la comunicación con pacientes. El sistema ofrece dos portales principales: uno para pacientes, enfocado en la autogestión de citas y acceso a su información; y otro para profesionales de la salud, enfocado en la administración de su agenda y la teleasistencia.

El proyecto busca resolver la fragmentación de los sistemas actuales, ofreciendo una experiencia de usuario unificada y segura, con interoperabilidad con sistemas EHR existentes a través del estándar FHIR.

## Características Principales 🚀

-   👤 **Portal de Pacientes:** Agendar, modificar y cancelar citas. Ver historial clínico y recibir recordatorios.
-   👨‍⚕️ **Portal de Profesionales:** Gestionar agenda con disponibilidad en tiempo real. Consultar historiales y lanzar teleconsultas.
-   🔐 **Autenticación Segura:** Sistema de registro y login con autenticación multifactor y control de permisos por rol.
-   📹 **Teleconsulta Integrada:** Videollamadas y chat seguro directamente en la plataforma.
-   🔄 **Integración con EHR (FHIR):** Capacidad para leer y escribir datos en sistemas de historias clínicas electrónicas compatibles con el estándar FHIR.
-   📱 **Diseño Responsivo:** Experiencia de usuario optimizada para dispositivos móviles, tablets y escritorio bajo el enfoque "Mobile First".

## Tecnologías Utilizadas 🛠️

Este proyecto utiliza un stack moderno y escalable.


<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

</div>

## Puesta en Marcha 🏁

Sigue estos pasos para levantar el entorno de desarrollo local.

1.  **Clonar el repositorio**
    ```bash
    git clone git@github.com:anchundiatech/MediLink-Frontend.git
    cd MediLink-Frontend
    ```

2.  **Instalar dependencias**
    Asegúrate de tener [pnpm](https://pnpm.io/installation) instalado.
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno**
    Crea un archivo `.env` en la raíz del proyecto a partir del archivo de ejemplo `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Luego, edita el archivo `.env` con las URLs de la API y otras claves necesarias.
    ```env
    VITE_API_GATEWAY_URL=http://localhost:3000/api
    VITE_SOME_OTHER_KEY=your_key_here
    ```

4.  **Ejecutar el servidor de desarrollo**
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Estructura del Proyecto 📁

El proyecto sigue una estructura organizada por funcionalidades para facilitar la mantenibilidad y escalabilidad.

```
src/
├── assets/         # Imágenes, fuentes y otros activos estáticos
├── components/     # Componentes de UI reutilizables (Botones, Inputs, etc.)
├── config/         # Configuración de la aplicación (ej. Axios, i18n)
├── features/       # Módulos de la aplicación (ej. auth, appointments)
├── hooks/          # Hooks personalizados de React
├── lib/            # Clientes de API, helpers y utilidades
├── pages/          # Vistas principales de la aplicación
├── providers/      # Context Providers de React
├── routes/         # Configuración del enrutado
├── styles/         # Estilos globales
└── App.tsx         # Componente raíz de la aplicación
```

## Scripts Disponibles 📜

-   `pnpm dev`: Inicia el servidor de desarrollo con Hot-Reload.
-   `pnpm build`: Compila la aplicación para producción en la carpeta `dist/`.
-   `pnpm lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
-   `pnpm preview`: Sirve localmente el contenido de `dist/` para previsualizar la build de producción.

## Cómo Contribuir 🤝

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:

1.  Haz un **Fork** de este repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz **Commit** (`git commit -m 'Añade nueva funcionalidad'`).
4.  Haz **Push** a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.

Por favor, asegúrate de que tu código siga las guías de estilo del proyecto y pase el linter.
