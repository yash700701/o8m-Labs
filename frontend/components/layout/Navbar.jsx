"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            {/* Container */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-lg sm:text-xl font-semibold tracking-tight text-black"
                    >
                        GIAKAA
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
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin"
                            className="hidden md:inline-flex rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Admin
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
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
                <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
                    <nav className="flex flex-col gap-2 px-6 py-6 text-base text-gray-800">
                        <Link
                            href="/blog"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Blog
                        </Link>
                        <a
                            href="/#solutions"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Solutions
                        </a>
                        <a
                            href="/#services"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Services
                        </a>
                        <a
                            href="/#contact"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Contact
                        </a>

                        <Link
                            href="/admin"
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex w-fit rounded-full border border-gray-200 px-4 py-2 text-sm"
                        >
                            Admin
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
