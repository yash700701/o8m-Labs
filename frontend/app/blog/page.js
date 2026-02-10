import { fetchBlogs } from "@/lib/api";
import BlogCard from "@/components/blog/BlogCard";

export const metadata = {
    title: "Blog | Giakaa Clone",
    description: "SEO-optimized articles and insights",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Giakaa Clone",
        description: "SEO-optimized articles and insights",
        type: "website",
    },
};

export default async function BlogPage() {
    const blogs = await fetchBlogs();

    return (
        <main className="bg-white text-gray-900">
            {/* Header */}
            <section className="mx-auto max-w-7xl pt-24">
                <p className="text-sm font-medium tracking-wide text-gray-500">
                    Blog
                </p>
                <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight">
                    Insights, launches, and growth systems
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-600">
                    Practical writing on content systems, SEO, and shipping modern
                    products.
                </p>
            </section>

            {/* Blog grid */}
            <section className="mx-auto max-w-7xl px-6 pb-24 pt-16">
                {blogs.length === 0 ? (
                    <p className="text-gray-500">No posts yet.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
