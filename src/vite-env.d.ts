/// <reference types="vite/client" />

// Declare the import.meta.glob function
interface ImportMeta {
  glob: (pattern: string, options?: {
    eager?: boolean;
    query?: string;
    import?: string;
  }) => Record<string, any>;
}
