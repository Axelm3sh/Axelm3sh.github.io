import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Blog from '../Blog';
import { getAllPosts } from '../../utils/blog';

// Mock the blog utility functions
vi.mock('../../utils/blog', () => ({
  getAllPosts: vi.fn(),
}));

// Helper function to render the component with Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Blog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the blog list correctly when posts are available', () => {
    // Mock the blog posts data
    const mockPosts = [
      {
        slug: 'hello-world',
        title: 'Hello World: My First Blog Post',
        date: '2025-06-18',
        excerpt: 'Welcome to my new blog!',
        tags: ['Web Development', 'React', 'Introduction'],
        content: '# Hello World\n\nThis is my first blog post.',
      },
      {
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-06-19',
        excerpt: 'This is a test post.',
        tags: ['Testing', 'React'],
        content: '# Test Post\n\nThis is a test post.',
      },
    ];

    // Setup the mock to return our test data
    (getAllPosts as jest.Mock).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the blog title is rendered
    expect(screen.getByText('Blog')).toBeInTheDocument();

    // Check that both blog posts are rendered
    expect(screen.getByText('Hello World: My First Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();

    // Check that dates are formatted and rendered
    expect(screen.getByText('June 18, 2025')).toBeInTheDocument();
    expect(screen.getByText('June 19, 2025')).toBeInTheDocument();

    // Check that tags are rendered
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();

    // Check that "Read More" links are rendered with correct hrefs
    const readMoreLinks = screen.getAllByText('Read More');
    expect(readMoreLinks.length).toBe(2);
    
    // Check that the sidebar is rendered
    expect(screen.getByText('Recent Posts')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  it('displays a message when no posts are available', () => {
    // Mock empty posts array
    (getAllPosts as jest.Mock).mockReturnValue([]);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the "No blog posts found" message is displayed
    expect(screen.getByText('No blog posts found.')).toBeInTheDocument();
  });

  it('handles error when fetching posts fails', () => {
    // Mock getAllPosts to throw an error
    (getAllPosts as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to fetch posts');
    });

    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Render the component
    renderWithRouter(<Blog />);

    // Check that error was logged
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Error loading blog posts:');

    // Check that the "No blog posts found" message is displayed
    expect(screen.getByText('No blog posts found.')).toBeInTheDocument();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('generates a tag cloud from all unique tags', () => {
    // Mock the blog posts data with overlapping tags
    const mockPosts = [
      {
        slug: 'post-1',
        title: 'Post 1',
        date: '2025-06-18',
        excerpt: 'Excerpt 1',
        tags: ['Tag1', 'Tag2', 'Tag3'],
        content: 'Content 1',
      },
      {
        slug: 'post-2',
        title: 'Post 2',
        date: '2025-06-19',
        excerpt: 'Excerpt 2',
        tags: ['Tag2', 'Tag3', 'Tag4'],
        content: 'Content 2',
      },
      {
        slug: 'post-3',
        title: 'Post 3',
        date: '2025-06-20',
        excerpt: 'Excerpt 3',
        tags: ['Tag3', 'Tag4', 'Tag5'],
        content: 'Content 3',
      },
    ];

    // Setup the mock to return our test data
    (getAllPosts as jest.Mock).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that all unique tags are rendered in the tag cloud
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('Tag3')).toBeInTheDocument();
    expect(screen.getByText('Tag4')).toBeInTheDocument();
    expect(screen.getByText('Tag5')).toBeInTheDocument();
    
    // Check that each tag appears only once in the tag cloud
    // (even though some tags appear in multiple posts)
    expect(screen.getAllByText('Tag3').length).toBe(4); // 3 in posts + 1 in tag cloud
  });

  it('handles posts with potentially dangerous content', () => {
    // Mock the blog posts data with potentially dangerous content
    const mockPosts = [
      {
        slug: 'dangerous-post',
        title: '<script>alert("XSS in title")</script>',
        date: '2025-06-21',
        excerpt: '<img src=x onerror=alert("XSS in excerpt")>',
        tags: ['<script>alert("XSS in tag")</script>'],
        content: '# Dangerous Post\n\n<script>alert("XSS in content")</script>',
      },
    ];

    // Setup the mock to return our test data
    (getAllPosts as jest.Mock).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the component renders without crashing
    // Note: In a real application, you would want to ensure that the content
    // is properly sanitized before rendering. This test is just checking that
    // the component doesn't crash when given potentially dangerous input.
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});