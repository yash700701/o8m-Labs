import { fetchBlogBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) return {};

    return {
        title: blog.meta_title || blog.title,
        description: blog.meta_description,
        alternates: {
            canonical: `/blog/${blog.slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.meta_description,
            images: blog.featured_image ? [blog.featured_image] : [],
        },
    };
}

export default async function BlogDetail({ params }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) notFound();

    return (
        <main className="bg-white text-gray-900">
            <article className="section mx-auto max-w-3xl px-6 pt-28 pb-24">
                {/* Header */}
                <div className="section__header mt-5">
                    <p className="section__kicker text-gray-500">
                        Article
                    </p>
                    <h1 className="section__title text-4xl font-semibold tracking-tight">
                        {blog.title}
                    </h1>
                    {blog.meta_title && (
                        <p className="mt-3 text-sm text-gray-500">
                            Meta Title: {blog.meta_title}
                        </p>
                    )}
                    {blog.meta_description && (
                        <p className="mt-2 text-sm text-gray-500">
                            Meta Description: {blog.meta_description}
                        </p>
                    )}
                </div>

                {/* Featured image */}
                {blog.featured_image && (
                    <div className="">
                        <img
                            src={blog.featured_image}
                            alt={blog.title}
                            loading="lazy"
                            className="
                mx-auto
                w-full
                max-w-4xl
                rounded-xl
                border
                border-gray-100
                object-cover
              "
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="text-neutral-800 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </article>
        </main>
    );
}
