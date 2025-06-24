import matter from 'gray-matter';

// Define the blog post type
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastUpdated?: string; // Optional field for the last update date
  excerpt: string;
  tags: string[];
  content: string;
}

// Use Vite's import.meta.glob to get all markdown files
// This is a Vite-specific feature that works in the browser
const blogFiles = import.meta.glob('/content/blog/*.md', { eager: true, as: 'raw' });

/**
 * Get all blog posts metadata
 */
export function getAllPosts(): BlogPost[] {
  // Process all blog files
  const allPostsData = Object.entries(blogFiles).map(([filePath, content]) => {
    // Extract slug from the file path
    const slug = filePath.replace('/content/blog/', '').replace('.md', '');

    // Use gray-matter to parse the post metadata section
    const { data, content: markdownContent } = matter(content as string);

    // Combine the data with the slug
    return {
      slug,
      title: data.title,
      date: data.date,
      lastUpdated: data.lastUpdated,
      excerpt: data.excerpt,
      tags: data.tags || [],
      content: markdownContent,
    } as BlogPost;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Find the file that matches the slug
    const filePath = `/content/blog/${slug}.md`;
    const content = blogFiles[filePath] as string;

    if (!content) {
      throw new Error(`Blog post with slug "${slug}" not found`);
    }

    // Use gray-matter to parse the post metadata section
    const { data, content: markdownContent } = matter(content);

    // Combine the data with the slug
    return {
      slug,
      title: data.title,
      date: data.date,
      lastUpdated: data.lastUpdated,
      excerpt: data.excerpt,
      tags: data.tags || [],
      content: markdownContent,
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  return Object.keys(blogFiles).map(filePath => 
    filePath.replace('/content/blog/', '').replace('.md', '')
  );
}
