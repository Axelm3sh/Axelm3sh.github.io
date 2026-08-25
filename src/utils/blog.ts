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

  const [, yaml = '', content = ''] = match;
  const data: Record<string, unknown> = {};

  for (const line of yaml.split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;

    const [, key = '', rawVal = ''] = kv;
    let val: unknown = rawVal.trim();

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

/**
 * Build a BlogPost from parsed frontmatter, or null if the required string
 * fields are missing. Frontmatter is untrusted input, so this validates rather
 * than asserting — a blanket `as BlogPost` would let `undefined` through typed
 * as `string`.
 */
function toBlogPost(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): BlogPost | null {
  const { title, date, excerpt, lastUpdated, tags } = data;

  if (typeof title !== 'string' || typeof date !== 'string' || typeof excerpt !== 'string') {
    return null;
  }

  return {
    slug,
    title,
    date,
    // exactOptionalPropertyTypes: omit the key entirely rather than set undefined
    ...(typeof lastUpdated === 'string' ? { lastUpdated } : {}),
    excerpt,
    tags: Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === 'string') : [],
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const allPostsData = Object.entries(blogFiles).flatMap(([filePath, content]) => {
    const slug = filePath.replace('/content/blog/', '').replace('.md', '');
    const { data, content: markdownContent } = parseFrontmatter(content as string);

    const post = toBlogPost(slug, data, markdownContent);
    if (!post) {
      console.error('Skipping blog post with incomplete frontmatter: %s', slug);
      return [];
    }
    return [post];
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = `/content/blog/${slug}.md`;
    const content = blogFiles[filePath];

    if (typeof content !== 'string' || !content) {
      console.error(`Blog post with slug %s not found`, slug);
      return null;
    }

    const { data, content: markdownContent } = parseFrontmatter(content);

    const post = toBlogPost(slug, data, markdownContent);
    if (!post) {
      console.error('Blog post with slug %s has incomplete frontmatter', slug);
      return null;
    }
    return post;
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
