// VITE_ is a required prefix

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_WEBAPP_SIGN_UP_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_SERVER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
