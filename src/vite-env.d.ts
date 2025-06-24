/// <reference types="vite/client" />

// Declare the import.meta.glob function
interface ImportMeta {
  glob: (pattern: string, options?: { 
    eager?: boolean; 
    as?: string; // Deprecated
    query?: string;
    import?: string;
  }) => Record<string, any>;
}

// Declare global properties for window
interface Window {
  global: typeof window;
  Buffer: {
    from: (value: any, encoding?: string) => any;
    isBuffer: (obj: any) => boolean;
    toBuffer: (obj: any) => any;
  };
}
