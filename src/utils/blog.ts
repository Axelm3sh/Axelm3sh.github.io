// Define the blog post type
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastUpdated?: string;
  excerpt: string;
  tags: string[];
  content: string;
}

/**
 * Lightweight frontmatter parser — replaces gray-matter to avoid its eval() usage.
 * Handles the simple YAML subset used by our blog posts (string values, string arrays).
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yaml = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yaml.split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;

    const key = kv[1];
    let val: unknown = kv[2].trim();

    // Handle JSON-style arrays: ["a", "b", "c"]
    if (typeof val === 'string' && val.startsWith('[')) {
      try {
        val = JSON.parse(val);
      } catch {
        // If JSON parse fails, keep as string
      }
    }

    // Strip surrounding quotes from string values
    if (typeof val === 'string') {
      val = val.replace(/^["']|["']$/g, '');
    }

    data[key] = val;
  }

  return { data, content };
}

// Use Vite's import.meta.glob to get all markdown files
const defaultBlogFiles = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

let blogFiles = defaultBlogFiles;

export function setBlogFiles(files: Record<string, string>) {
  blogFiles = files;
}

export function resetBlogFiles() {
  blogFiles = defaultBlogFiles;
}

export function getAllPosts(): BlogPost[] {
  const allPostsData = Object.entries(blogFiles).map(([filePath, content]) => {
    const slug = filePath.replace('/content/blog/', '').replace('.md', '');
    const { data, content: markdownContent } = parseFrontmatter(content as string);

    return {
      slug,
      title: data.title,
      date: data.date,
      lastUpdated: data.lastUpdated,
      excerpt: data.excerpt,
      tags: (data.tags as string[]) || [],
      content: markdownContent,
    } as BlogPost;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = `/content/blog/${slug}.md`;
    const content = blogFiles[filePath] as string;

    if (!content) {
      console.error(`Blog post with slug %s not found`, slug);
      return null;
    }

    const { data, content: markdownContent } = parseFrontmatter(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      lastUpdated: data.lastUpdated,
      excerpt: data.excerpt,
      tags: (data.tags as string[]) || [],
      content: markdownContent,
    } as BlogPost;
  } catch (error) {
    console.error('Error getting post with slug %s:', slug, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  return Object.keys(blogFiles).map(filePath =>
    filePath.replace('/content/blog/', '').replace('.md', '')
  );
}
