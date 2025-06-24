import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the import.meta.glob functionality used in blog.ts
vi.mock('import.meta.glob', () => {
  return {
    default: (path: string, options: any) => {
      // Mock implementation for blog post files
      if (path === '/content/blog/*.md') {
        return {
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
        };
      }
      return {};
    },
  };
});

// Mock for ReactMarkdown to make testing easier
vi.mock('react-markdown', () => {
  return {
    default: vi.fn(({ children }) => {
      return { 
        type: 'div', 
        props: { 
          'data-testid': 'markdown-content', 
          children 
        } 
      };
    }),
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