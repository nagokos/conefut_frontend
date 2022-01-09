interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
  // その他の環境変数...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
