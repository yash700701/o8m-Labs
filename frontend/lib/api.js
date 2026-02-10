const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:5000";

export async function fetchHeroSlides() {
    const res = await fetch(`${API_BASE}/api/hero`, {
        cache: "no-store",
    });
    return res.json();
}

export async function fetchBlogs() {
    const res = await fetch(`${API_BASE}/api/blogs`, {
        next: { revalidate: 60 },
    });
    return res.json();
}

export async function fetchBlogBySlug(slug) {
    const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}
