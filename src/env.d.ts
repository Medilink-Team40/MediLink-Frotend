/// <reference types="vite/client" />


interface ImportMetaEnv {
    DEV: any;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_KEYCLOAK_URL: string;
    readonly VITE_KEYCLOAK_REALM: string;
    readonly VITE_KEYCLOAK_CLIENT_ID: string;
    readonly VITE_DEV_TOKEN?: string;
}


interface ImportMeta {
    readonly env: ImportMetaEnv
}