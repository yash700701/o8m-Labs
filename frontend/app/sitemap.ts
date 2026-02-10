const API_BASE =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const res = await fetch(`${API_BASE}/api/blogs?status=published`, {
    next: { revalidate: 300 }
  });

  const blogs = res.ok ? await res.json() : [];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
    },
    ...blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updated_at || blog.created_at || new Date(),
    })),
  ];
}
