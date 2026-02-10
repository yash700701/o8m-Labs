export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-7xl p-6">
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                    {/* Brand */}
                    <div>
                        <p className="text-lg font-semibold tracking-tight text-gray-900">
                            o8m Labs
                        </p>
                        <p className="mt-2 max-w-sm text-sm text-gray-600">
                            Strategy, product, and content systems built for
                            scale.
                        </p>
                    </div>

                    {/* Links */}
                    <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-600">
                        <a
                            href="/#solutions"
                            className="hover:text-gray-900 transition"
                        >
                            Solutions
                        </a>
                        <a
                            href="/#services"
                            className="hover:text-gray-900 transition"
                        >
                            Services
                        </a>
                        <a
                            href="/blog"
                            className="hover:text-gray-900 transition"
                        >
                            Blog
                        </a>
                        <a
                            href="/admin"
                            className="hover:text-gray-900 transition"
                        >
                            CMS
                        </a>
                    </nav>
                </div>

                {/* Bottom row */}
                <div className="mt-12 flex flex-col gap-4 border-t border-gray-100 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                    <p>
                        © {new Date().getFullYear()} o8m Labs. All rights
                        reserved.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-gray-900">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
