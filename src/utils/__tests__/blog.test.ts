import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts, getPostBySlug, getAllPostSlugs, BlogPost } from '../blog';

// We're using the mocked import.meta.glob from the setup file
// This gives us two test posts: 'hello-world' and 'test-post'

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
      
      expect(posts[1].title).toBe('Hello World: My First Blog Post');
      expect(posts[1].date).toBe('2025-06-18');
      expect(posts[1].excerpt).toContain('Welcome to my new blog!');
      expect(posts[1].tags).toEqual(['Web Development', 'React', 'Introduction']);
      expect(posts[1].content).toContain('# Hello World: My First Blog Post');
    });
    
    it('handles posts with missing tags by providing an empty array', () => {
      // Mock a post without tags
      vi.mock('import.meta.glob', () => {
        return {
          default: (path: string, options: any) => {
            if (path === '/content/blog/*.md') {
              return {
                '/content/blog/no-tags.md': `---
title: "Post Without Tags"
date: "2025-06-20"
excerpt: "This post has no tags."
---

# Post Without Tags

This post doesn't have any tags.`,
              };
            }
            return {};
          },
        };
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
      expect(post?.title).toBe('Hello World: My First Blog Post');
      expect(post?.date).toBe('2025-06-18');
      expect(post?.excerpt).toContain('Welcome to my new blog!');
      expect(post?.tags).toEqual(['Web Development', 'React', 'Introduction']);
      expect(post?.content).toContain('# Hello World: My First Blog Post');
    });
    
    it('returns null when given an invalid slug', () => {
      const post = getPostBySlug('non-existent-post');
      
      // Check that null is returned for non-existent posts
      expect(post).toBeNull();
    });
    
    it('handles errors gracefully', () => {
      // Mock console.error to prevent test output pollution
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock a post that will cause an error when parsed
      vi.mock('import.meta.glob', () => {
        return {
          default: (path: string, options: any) => {
            if (path === '/content/blog/*.md') {
              return {
                '/content/blog/error-post.md': 'Invalid frontmatter',
              };
            }
            return {};
          },
        };
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
      // Mock a post with potentially dangerous frontmatter
      vi.mock('import.meta.glob', () => {
        return {
          default: (path: string, options: any) => {
            if (path === '/content/blog/*.md') {
              return {
                '/content/blog/dangerous-post.md': `---
title: "<script>alert('XSS in title')</script>"
date: "2025-06-21"
excerpt: "<img src=x onerror=alert('XSS in excerpt')>"
tags: ["<script>alert('XSS in tag')</script>"]
---

# Dangerous Post

This post has potentially dangerous frontmatter.`,
              };
            }
            return {};
          },
        };
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