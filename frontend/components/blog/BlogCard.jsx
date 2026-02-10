import Link from "next/link";

export default function BlogCard({ blog }) {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="group block"
        >
            <article className="overflow-hidden border rounded-2xl border-gray-400 bg-white transition hover:border-gray-100 hover:shadow-lg">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="p-3">
                    <h2 className="text-lg font-semibold leading-snug tracking-tight">
                        {blog.title}
                    </h2>

                    <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                        {blog.meta_description}
                    </p>

                    <span className="mt-5 inline-flex items-center text-sm font-medium text-gray-900">
                        Read article →
                    </span>
                </div>
            </article>
        </Link>
    );
}
