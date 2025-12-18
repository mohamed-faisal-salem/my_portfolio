/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  readonly VITE_API_KEY: string;
  // أضف متغيرات البيئة الأخرى هنا
}