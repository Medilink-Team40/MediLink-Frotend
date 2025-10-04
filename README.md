# MediLink-Frontend 🩺✨

Portal web para gestión de citas y teleasistencia en el sector salud, con integración de historiales médicos (EHR) y videollamadas seguras. Este repositorio contiene el código fuente de la aplicación frontend, construida con React y Vite.

![GitHub issues](https://img.shields.io/github/issues/anchundiatech/medilink-frontend)
![GitHub forks](https://img.shields.io/github/forks/anchundiatech/medilink-frontend)
![GitHub stars](https://img.shields.io/github/stars/anchundiatech/medilink-frontend)

## Índice

1.  [Descripción del Proyecto](#descripción-del-proyecto-️)
2.  [Características Principales](#características-principales-)
3.  [Tecnologías Utilizadas](#tecnologías-utilizadas-)
4.  [Puesta en Marcha](#puesta-en-marcha-)
5.  [Scripts Disponibles](#scripts-disponibles-)
6.  [Arquitectura del Frontend](#arquitectura-del-frontend-)
7.  [Contribuciones](#contribuciones-)

## Descripción del Proyecto 🗒️

**MediLink** es una plataforma web moderna diseñada para clínicas y centros de salud, con el objetivo de centralizar la gestión de citas, historiales médicos y la comunicación con pacientes. El sistema ofrece dos portales principales: uno para pacientes, enfocado en la autogestión de citas y acceso a su información; y otro para profesionales de la salud, enfocado en la administración de su agenda y la teleasistencia.

El proyecto busca resolver la fragmentación de los sistemas actuales, ofreciendo una experiencia de usuario unificada y segura, con interoperabilidad con sistemas EHR existentes a través del estándar FHIR.

## Características Principales 🚀

* 👤 **Portal de Pacientes:** Agendar, modificar y cancelar citas. Ver historial clínico y recibir recordatorios.
* 👨‍⚕️ **Portal de Profesionales:** Gestionar agenda con disponibilidad en tiempo real. Consultar historiales y lanzar teleconsultas.
* 🔐 **Autenticación Segura:** Sistema de registro y login con autenticación multifactor y control de permisos por rol.
* 📹 **Teleconsulta Integrada:** Videollamadas y chat seguro directamente en la plataforma.
* 🔄 **Integración con EHR (FHIR):** Capacidad para leer y escribir datos en sistemas de historias clínicas electrónicas compatibles con el estándar FHIR.
* 📱 **Diseño Responsivo:** Experiencia de usuario optimizada para dispositivos móviles, tablets y escritorio bajo el enfoque "Mobile First".

## Tecnologías Utilizadas 🛠️

Este proyecto utiliza un stack moderno y escalable, separado en frontend y backend.

#### **Frontend**
* **Framework:** [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Gestión de Estado del Servidor:** [TanStack Query (React Query)](https://tanstack.com/query)
* **Cliente HTTP:** [Axios](https://axios-http.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Gestor de Paquetes:** [pnpm](https://pnpm.io/)


## Puesta en Marcha 🏁

Sigue estos pasos para levantar el entorno de desarrollo local.

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/anchundiatech/MediLink-Frontend.git](https://github.com/anchundiatech/MediLink-Frontend.git)
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

## Scripts Disponibles 📜

* `pnpm dev`: Inicia el servidor de desarrollo.
* `pnpm build`: Compila la aplicación para producción en la carpeta `dist/`.
* `pnpm lint`: (Recomendado) Ejecuta el linter para revisar la calidad del código.
* `pnpm preview`: Sirve localmente el contenido de la carpeta `dist/` para previsualizar la build de producción.

## Arquitectura del Frontend 🏛️

El frontend sigue una **Arquitectura Modular por Funcionalidad (Feature-Based Architecture)**, donde el código se organiza en función de las características del negocio (citas, pacientes, autenticación) para mejorar la escalabilidad y mantenibilidad.
