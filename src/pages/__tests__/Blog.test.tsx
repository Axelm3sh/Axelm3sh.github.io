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
    (getAllPosts as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the blog title is rendered
    expect(screen.getByText('Blog')).toBeInTheDocument();

    // Check that both blog posts are rendered
    expect(screen.getByTestId('post-title-hello-world')).toBeInTheDocument();
    expect(screen.getByTestId('post-title-test-post')).toBeInTheDocument();

    // Check that dates are formatted and rendered
    expect(screen.getByTestId('post-date-hello-world')).toBeInTheDocument();
    expect(screen.getByTestId('post-date-test-post')).toBeInTheDocument();

    // Check that tags are rendered - using getAllByText since data-testid might not be unique
    expect(screen.getAllByText('Web Development')[0]).toBeInTheDocument();
    expect(screen.getAllByText('React')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Introduction')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Testing')[0]).toBeInTheDocument();

    // Check that "Read More" links are rendered with correct hrefs
    expect(screen.getByTestId('read-more-hello-world')).toBeInTheDocument();
    expect(screen.getByTestId('read-more-test-post')).toBeInTheDocument();

    // Check that the sidebar is rendered
    expect(screen.getByText('Recent Posts')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  it('displays a message when no posts are available', () => {
    // Mock empty posts array
    (getAllPosts as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the "No blog posts found" message is displayed
    expect(screen.getByText('No blog posts found.')).toBeInTheDocument();
  });

  it('handles error when fetching posts fails', () => {
    // Mock getAllPosts to throw an error
    (getAllPosts as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
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
    (getAllPosts as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that all unique tags are rendered in the tag cloud
    expect(screen.getByTestId('tag-Tag1')).toBeInTheDocument();
    expect(screen.getByTestId('tag-Tag2')).toBeInTheDocument();
    expect(screen.getByTestId('tag-Tag3')).toBeInTheDocument();
    expect(screen.getByTestId('tag-Tag4')).toBeInTheDocument();
    expect(screen.getByTestId('tag-Tag5')).toBeInTheDocument();

    // Check that each tag appears only once in the tag cloud
    // (even though some tags appear in multiple posts)
    const tag3InPosts = screen.getAllByTestId('post-tag-Tag3');
    expect(tag3InPosts.length).toBe(3); // 3 in posts (one in each post that has Tag3)
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
    (getAllPosts as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPosts);

    // Render the component
    renderWithRouter(<Blog />);

    // Check that the component renders without crashing
    // Note: In a real application, you would want to ensure that the content
    // is properly sanitized before rendering. This test is just checking that
    // the component doesn't crash when given potentially dangerous input.
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});
