export default function AdminHome() {
    return (
        <div className="min-h-screen bg-white">
            <main className="mx-auto max-w-6xl px-6  pb-24">
                {/* Header */}
                <header className="mb-16 pt-24">
                    <p className="text-xs font-medium tracking-wider uppercase text-gray-500">
                        Dashboard
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
                        Admin Overview
                    </h1>
                    <p className="mt-4 max-w-2xl text-base text-gray-600">
                        Manage hero sections and blog content in one place.
                    </p>
                </header>

                {/* Cards */}
                <section className="grid gap-8 md:grid-cols-2">
                    {/* Hero Slider */}
                    <div className="rounded-2xl border border-gray-400 bg-white p-8 transition hover:border-gray-200 hover:shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Hero Slider
                            </h3>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                Homepage
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-600">
                            Update homepage slides, CTA links, and media.
                        </p>

                        <a
                            href="/admin/hero"
                            className="mt-6 inline-flex items-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                        >
                            Manage slides →
                        </a>
                    </div>

                    {/* Blog Posts */}
                    <div className="rounded-2xl border border-gray-400 bg-white p-8 transition hover:border-gray-200 hover:shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Blog Posts
                            </h3>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                Content
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-600">
                            Create, edit, and publish SEO-optimized posts.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/admin/blogs"
                                className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                            >
                                View blogs
                            </a>
                            <a
                                href="/admin/blogs/new"
                                className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                + New Blog
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
