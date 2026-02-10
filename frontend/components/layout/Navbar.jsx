"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/30 backdrop-blur">
            {/* INNER CONTAINER — matches BlogPage */}
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-semibold tracking-tight text-black">
                            GIAKAA
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
                        <Link href="/blog" className="hover:text-gray-900">
                            Blog
                        </Link>
                        <a href="/#solutions" className="hover:text-gray-900">
                            Solutions
                        </a>
                        <a href="/#services" className="hover:text-gray-900">
                            Services
                        </a>
                        <a href="/#contact" className="hover:text-gray-900">
                            Contact
                        </a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="hidden rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 md:inline-flex"
                        >
                            Admin
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        open
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-gray-100 bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl px-6 py-6 text-sm text-gray-700">
                        <Link href="/blog" onClick={() => setOpen(false)}>
                            Blog
                        </Link>
                        <a href="/#solutions" onClick={() => setOpen(false)}>
                            Solutions
                        </a>
                        <a href="/#services" onClick={() => setOpen(false)}>
                            Services
                        </a>
                        <a href="/#contact" onClick={() => setOpen(false)}>
                            Contact
                        </a>
                        <Link
                            href="/admin"
                            className="mt-2 inline-flex w-fit rounded-full border border-gray-200 px-4 py-2"
                            onClick={() => setOpen(false)}
                        >
                            Admin
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
