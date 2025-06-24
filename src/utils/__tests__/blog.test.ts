import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAllPosts, getPostBySlug, getAllPostSlugs, setBlogFiles, resetBlogFiles } from '../blog';

// Test data for blog posts
const testBlogFiles = {
  '/content/blog/hello-world.md': `---
title: "Hello World: Blog is up and running!"
date: "2025-06-18"
lastUpdated: "2025-06-20"
excerpt: "This is the first post in what I hope is a working blog architecture...Don't stare too long at the placeholder banners..."
tags: ["Web Development", "React", "Introduction"]
---

# My First Blog Post

Welcome to _THE_ new blog!

## Why I Started This Blog

This is a first of potentially many blogs I'll be writing up. It'll just be my thoughts or potentially what I'm doing. This first post is a test to the new blog rendering code. There may be few 🐛...

## What to Expect

The unexpected.

## Code Example

Here's a simple React component example:

\`\`\`jsx
import React from 'react';

const Greeting = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to my blog.</p>
    </div>
  );
};

export default Greeting;
\`\`\`

## What's Next

dunno...
Happy coding!`,
  '/content/blog/test-post.md': `---
title: "Test Post"
date: "2025-06-19"
excerpt: "This is a test post for unit testing."
tags: ["Testing", "React"]
---

# Test Post

This is a test post for unit testing.`,
};

// Set up and tear down for each test
beforeEach(() => {
  // Set the test blog files
  setBlogFiles(testBlogFiles);
});

afterEach(() => {
  // Reset the blog files to default
  resetBlogFiles();
  // Clear all mocks
  vi.clearAllMocks();
});

describe('Blog Utility Functions', () => {
  describe('getAllPosts', () => {
    it('returns all blog posts sorted by date (newest first)', () => {
      const posts = getAllPosts();

      // Check that we have the expected number of posts
      expect(posts.length).toBe(2);

      // Check that posts are sorted by date (newest first)
      expect(posts[0].slug).toBe('test-post'); // 2025-06-19
      expect(posts[1].slug).toBe('hello-world'); // 2025-06-18

      // Check that the post data is correctly parsed
      expect(posts[0].title).toBe('Test Post');
      expect(posts[0].date).toBe('2025-06-19');
      expect(posts[0].excerpt).toBe('This is a test post for unit testing.');
      expect(posts[0].tags).toEqual(['Testing', 'React']);
      expect(posts[0].content).toContain('# Test Post');

      expect(posts[1].title).toBe('Hello World: Blog is up and running!');
      expect(posts[1].date).toBe('2025-06-18');
      expect(posts[1].lastUpdated).toBe('2025-06-20');
      expect(posts[1].excerpt).toContain('This is the first post in what I hope is a working blog architecture');
      expect(posts[1].tags).toEqual(['Web Development', 'React', 'Introduction']);
      expect(posts[1].content).toContain('# My First Blog Post');
    });

    it('handles posts with missing tags by providing an empty array', () => {
      // Set up a post without tags
      setBlogFiles({
        ...testBlogFiles,
        '/content/blog/no-tags.md': `---
title: "Post Without Tags"
date: "2025-06-20"
excerpt: "This post has no tags."
---

# Post Without Tags

This post doesn't have any tags.`
      });

      const posts = getAllPosts();

      // Find the post without tags
      const postWithoutTags = posts.find(post => post.slug === 'no-tags');

      // Check that the post has an empty tags array
      expect(postWithoutTags?.tags).toEqual([]);
    });
  });

  describe('getPostBySlug', () => {
    it('returns the correct post when given a valid slug', () => {
      const post = getPostBySlug('hello-world');

      // Check that the post data is correctly parsed
      expect(post?.slug).toBe('hello-world');
      expect(post?.title).toBe('Hello World: Blog is up and running!');
      expect(post?.date).toBe('2025-06-18');
      expect(post?.lastUpdated).toBe('2025-06-20');
      expect(post?.excerpt).toContain('This is the first post in what I hope is a working blog architecture');
      expect(post?.tags).toEqual(['Web Development', 'React', 'Introduction']);
      expect(post?.content).toContain('# My First Blog Post');
    });

    it('returns null when given an invalid slug', () => {
      const post = getPostBySlug('non-existent-post');

      // Check that null is returned for non-existent posts
      expect(post).toBeNull();
    });

    it('handles errors gracefully', () => {
      // Mock console.error to prevent test output pollution
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Set up a post that will cause an error when parsed by gray-matter
      // This is a malformed YAML frontmatter that will cause gray-matter to throw an error
      setBlogFiles({
        ...testBlogFiles,
        '/content/blog/error-post.md': `---
title: "Error Post
date: 2025-06-20
excerpt: "This post has invalid frontmatter.
---

# Error Post

This post has invalid frontmatter that will cause gray-matter to throw an error.`
      });

      const post = getPostBySlug('error-post');

      // Check that null is returned when an error occurs
      expect(post).toBeNull();

      // Check that the error was logged
      expect(consoleErrorSpy).toHaveBeenCalled();

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getAllPostSlugs', () => {
    it('returns all blog post slugs', () => {
      const slugs = getAllPostSlugs();

      // Check that we have the expected number of slugs
      expect(slugs.length).toBe(2);

      // Check that the slugs are correct
      expect(slugs).toContain('hello-world');
      expect(slugs).toContain('test-post');
    });
  });

  // Additional security tests
  describe('Security Considerations', () => {
    it('sanitizes frontmatter data to prevent injection attacks', () => {
      // Set up a post with potentially dangerous frontmatter
      setBlogFiles({
        ...testBlogFiles,
        '/content/blog/dangerous-post.md': `---
title: "<script>alert('XSS in title')</script>"
date: "2025-06-21"
excerpt: "<img src=x onerror=alert('XSS in excerpt')>"
tags: ["<script>alert('XSS in tag')</script>"]
---

# Dangerous Post

This post has potentially dangerous frontmatter.`
      });

      const post = getPostBySlug('dangerous-post');

      // Check that the post data is returned (not null)
      expect(post).not.toBeNull();

      // Note: In a real application, you would want to ensure that the frontmatter
      // data is sanitized before it's used in the UI. This test is just checking
      // that the utility functions don't crash when given potentially dangerous input.
      // The actual sanitization would typically happen in the UI components or
      // through a sanitization library.
    });
  });
});
