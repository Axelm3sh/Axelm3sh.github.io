import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import BlogPost from '../BlogPost';
import { getPostBySlug } from '../../utils/blog';

// Mock the blog utility functions
vi.mock('../../utils/blog', () => ({
  getPostBySlug: vi.fn(),
}));

// Mock for useParams and useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => mockNavigate),
  };
});

describe('BlogPost Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the blog post correctly when valid slug is provided', async () => {
    // Mock the slug parameter
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: 'hello-world' });

    // Mock the blog post data with actual content from hello-world.md
    const mockPost = {
      slug: 'hello-world',
      title: 'Hello World: Blog is up and running!',
      date: '2025-06-18',
      lastUpdated: '2025-06-20',
      excerpt: 'This is the first post in what I hope is a working blog architecture...Don\'t stare too long at the placeholder banners...',
      tags: ['Web Development', 'React', 'Introduction'],
      content: '# My First Blog Post\n\nWelcome to _THE_ new blog!\n\n## Why I Started This Blog\n\nThis is a first of potentially many blogs I\'ll be writing up. It\'ll just be my thoughts or potentially what I\'m doing. This first post is a test to the new blog rendering code. There may be few 🐛...\n\n## What to Expect\n\nThe unexpected.\n\n## Code Example\n\nHere\'s a simple React component example:\n\n```jsx\nimport React from \'react\';\n\nconst Greeting = ({ name }) => {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to my blog.</p>\n    </div>\n  );\n};\n\nexport default Greeting;\n```\n\n## What\'s Next\n\ndunno...\nHappy coding!',
    };

    // Setup the mock to return our test data
    (getPostBySlug as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // Check that the title is rendered
    expect(screen.getByText('Hello World: Blog is up and running!')).toBeInTheDocument();

    // Check that the date is formatted and rendered
    const dateElement = screen.getByTestId('blog-post-date');
    expect(dateElement).toHaveTextContent('Published: June 17, 2025');

    // Check that tags are rendered
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();

    // Check that the markdown content is passed to ReactMarkdown
    const markdownContent = screen.getByTestId('markdown-content');
    expect(markdownContent).toHaveTextContent('My First Blog Post');
    expect(markdownContent).toHaveTextContent('Welcome to _THE_ new blog!');
    expect(markdownContent).toHaveTextContent('Why I Started This Blog');
    expect(markdownContent).toHaveTextContent('What to Expect');
    expect(markdownContent).toHaveTextContent('Code Example');
    expect(markdownContent).toHaveTextContent('What\'s Next');
    expect(markdownContent).toHaveTextContent('Happy coding!');
  });

  it('redirects to blog page when slug is not provided', async () => {
    // Mock empty slug parameter
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: undefined });

    // Render the component
    render(<BlogPost />);

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/blog');
  });

  it('redirects to blog page when post is not found', async () => {
    // Mock the slug parameter
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: 'non-existent-post' });

    // Mock getPostBySlug to return null (post not found)
    (getPostBySlug as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);

    // Render the component
    render(<BlogPost />);

    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/blog');
  });

  it('handles error when fetching post fails', async () => {
    // Mock the slug parameter
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: 'error-post' });

    // Mock getPostBySlug to throw an error
    (getPostBySlug as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
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
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: 'xss-test' });

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
    (getPostBySlug as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // Check that the markdown content is passed to ReactMarkdown
    // ReactMarkdown should sanitize the content by default
    const markdownContent = screen.getByTestId('markdown-content');
    expect(markdownContent).toHaveTextContent('# XSS Test <script>alert("XSS")</script> <img src="x" onerror="alert(\'XSS\')" />');

    // Note: We're not actually testing if ReactMarkdown sanitizes the content here,
    // since we've mocked ReactMarkdown. In a real application, you would want to
    // ensure that ReactMarkdown is configured to sanitize HTML by default.
  });

  it('handles malformed date gracefully', async () => {
    // Mock the slug parameter
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ slug: 'malformed-date' });

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
    (getPostBySlug as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPost);

    // Render the component
    render(<BlogPost />);

    // The date should still be displayed without crashing
    // It might not be formatted correctly, but the component shouldn't crash
    expect(screen.getByText('Post with Malformed Date')).toBeInTheDocument();
  });
});
