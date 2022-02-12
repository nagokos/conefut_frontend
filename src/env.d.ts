interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAP_API_KEY: string;
  // その他の環境変数...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
