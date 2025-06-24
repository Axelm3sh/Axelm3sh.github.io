import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Polyfill for Buffer which is required by gray-matter
if (typeof window !== 'undefined') {
  // Define global if it doesn't exist
  if (!window.global) {
    window.global = window;
  }

  // Define Buffer if it doesn't exist
  if (!window.Buffer) {
    window.Buffer = {
      from: (value: string | Uint8Array, _encoding?: string): Uint8Array => {
        if (typeof value === 'string') {
          return new TextEncoder().encode(value);
        }
        return value;
      },
      isBuffer: (obj: any): boolean => {
        return obj instanceof Uint8Array;
      },
      // Add toBuffer method that was mentioned in the error
      toBuffer: (obj: string | Uint8Array): Uint8Array => {
        if (typeof obj === 'string') {
          return new TextEncoder().encode(obj);
        }
        return obj;
      }
    };
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
