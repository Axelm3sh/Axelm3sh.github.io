import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the import.meta.glob functionality used in blog.ts
vi.mock('import.meta.glob', () => {
  return {
    default: (path: string, options: Record<string, any>) => {
      // Mock implementation for blog post files
      if (path === '/content/blog/*.md') {
        const mockFiles = {
          '/content/blog/hello-world.md': `---
title: "Hello World: My First Blog Post"
date: "2025-06-18"
excerpt: "Welcome to my new blog! This is the first post in what I hope will be a series of interesting articles about web development, design, and technology."
tags: ["Web Development", "React", "Introduction"]
---

# Hello World: My First Blog Post

Welcome to my new blog! This is the first post in what I hope will be a series of interesting articles about web development, design, and technology.`,
          '/content/blog/test-post.md': `---
title: "Test Post"
date: "2025-06-19"
excerpt: "This is a test post for unit testing."
tags: ["Testing", "React"]
---

# Test Post

This is a test post for unit testing.`,
          '/content/blog/dangerous-post.md': `---
title: "<script>alert('XSS in title')</script>"
date: "2025-06-21"
excerpt: "<img src=x onerror=alert('XSS in excerpt')>"
tags: ["<script>alert('XSS in tag')</script>"]
---

# Dangerous Post

This post has potentially dangerous frontmatter.`,
        };

        // Return the mock files in the format expected by the updated glob options
        const result: Record<string, string> = {};
        Object.entries(mockFiles).forEach(([filePath, content]) => {
          result[filePath] = content;
        });
        return result;
      }
      return {};
    },
  };
});

// Mock for ReactMarkdown to make testing easier
vi.mock('react-markdown', () => {
  const React = require('react');
  return {
    default: vi.fn(({ children, remarkPlugins }: { children: any, remarkPlugins?: any[] }) => {
      return React.createElement('div', { 'data-testid': 'markdown-content' }, children);
    }),
  };
});

// Mock for remark-gfm
vi.mock('remark-gfm', () => {
  return {
    default: vi.fn(),
  };
});

// Mock for react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
  };
});
