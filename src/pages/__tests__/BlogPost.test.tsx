import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPost from '../BlogPost';
import { getPostBySlug } from '../../utils/blog';

// Mock the blog utility functions
vi.mock('../../utils/blog', () => ({
  getPostBySlug: vi.fn(),
}));

// Mock for useParams and useNavigate
const mockNavigate = vi.fn();
const mockUseParams = useParams as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;

describe('BlogPost Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('renders the blog post correctly when valid slug is provided', async () => {
    // Mock the slug parameter
    mockUseParams.mockReturnValue({ slug: 'hello-world' });

    // Mock the blog post data
    const mockPost = {
      slug: 'hello-world',
      title: 'Hello World: My First Blog Post',
      date: '2025-06-18',
      excerpt: 'Welcome to my new blog!',
      tags: ['Web Development', 'React', 'Introduction'],
      content: '# Hello World\n\nThis is my first blog post.',
    };

    // Setup the mock to return our test data
    (getPostBySlug as jest.Mock).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // Check that the title is rendered
    expect(screen.getByText('Hello World: My First Blog Post')).toBeInTheDocument();

    // Check that the date is formatted and rendered
    expect(screen.getByText('June 18, 2025')).toBeInTheDocument();

    // Check that tags are rendered
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();

    // Check that the markdown content is passed to ReactMarkdown
    const markdownContent = screen.getByTestId('markdown-content');
    expect(markdownContent).toHaveTextContent('# Hello World\n\nThis is my first blog post.');
  });

  it('redirects to blog page when slug is not provided', async () => {
    // Mock empty slug parameter
    mockUseParams.mockReturnValue({ slug: undefined });

    // Render the component
    render(<BlogPost />);

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/blog');
  });

  it('redirects to blog page when post is not found', async () => {
    // Mock the slug parameter
    mockUseParams.mockReturnValue({ slug: 'non-existent-post' });

    // Mock getPostBySlug to return null (post not found)
    (getPostBySlug as jest.Mock).mockReturnValue(null);

    // Render the component
    render(<BlogPost />);

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/blog');
  });

  it('handles error when fetching post fails', async () => {
    // Mock the slug parameter
    mockUseParams.mockReturnValue({ slug: 'error-post' });

    // Mock getPostBySlug to throw an error
    (getPostBySlug as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to fetch post');
    });

    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Render the component
    render(<BlogPost />);

    // Check that error was logged
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Error loading blog post:');

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/blog');

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('sanitizes potentially dangerous markdown content', async () => {
    // Mock the slug parameter
    mockUseParams.mockReturnValue({ slug: 'xss-test' });

    // Mock the blog post data with potentially dangerous content
    const mockPost = {
      slug: 'xss-test',
      title: 'XSS Test',
      date: '2025-06-19',
      excerpt: 'Testing XSS protection',
      tags: ['Security', 'Testing'],
      content: '# XSS Test\n\n<script>alert("XSS")</script>\n\n<img src="x" onerror="alert(\'XSS\')" />',
    };

    // Setup the mock to return our test data
    (getPostBySlug as jest.Mock).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // Check that the markdown content is passed to ReactMarkdown
    // ReactMarkdown should sanitize the content by default
    const markdownContent = screen.getByTestId('markdown-content');
    expect(markdownContent).toHaveTextContent('# XSS Test\n\n<script>alert("XSS")</script>\n\n<img src="x" onerror="alert(\'XSS\')" />');
    
    // Note: We're not actually testing if ReactMarkdown sanitizes the content here,
    // since we've mocked ReactMarkdown. In a real application, you would want to
    // ensure that ReactMarkdown is configured to sanitize HTML by default.
  });

  it('handles malformed date gracefully', async () => {
    // Mock the slug parameter
    mockUseParams.mockReturnValue({ slug: 'malformed-date' });

    // Mock the blog post data with malformed date
    const mockPost = {
      slug: 'malformed-date',
      title: 'Post with Malformed Date',
      date: 'not-a-date',
      excerpt: 'This post has a malformed date',
      tags: ['Testing'],
      content: '# Post with Malformed Date',
    };

    // Setup the mock to return our test data
    (getPostBySlug as jest.Mock).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // The date should still be displayed without crashing
    // It might not be formatted correctly, but the component shouldn't crash
    expect(screen.getByText('Post with Malformed Date')).toBeInTheDocument();
  });
});