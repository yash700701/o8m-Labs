"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function BlogAdminList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${API}/api/blogs?status=all`)
            .then((res) => res.json())
            .then(setBlogs);
    }, []);

    return (
        <div className="w-full bg-white pt-24">
            <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
            {/* Header */}
            <header className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        CMS
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
                        Blogs
                    </h1>
                    <p className="mt-4 max-w-xl text-gray-600">
                        Draft, publish, and manage long-form content.
                    </p>
                </div>

                <a
                    href="/admin/blogs/new"
                    className="inline-flex w-fit rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    + New Blog
                </a>
            </header>

            {/* Table Card */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 text-gray-500">
                            <tr>
                                <th className="py-3 text-left font-medium">
                                    Title
                                </th>
                                <th className="py-3 text-left font-medium">
                                    Status
                                </th>
                                <th className="py-3 text-left font-medium">
                                    Updated
                                </th>
                                <th className="py-3 text-left font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {blogs.map((blog) => (
                                <tr
                                    key={blog.id}
                                    className="border-b border-gray-100 last:border-0"
                                >
                                    <td className="py-4 font-medium text-gray-900">
                                        {blog.title}
                                    </td>

                                    <td className="py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                blog.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : blog.status === "draft"
                                                      ? "bg-gray-100 text-gray-700"
                                                      : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </td>

                                    <td className="py-4 text-gray-600">
                                        {blog.updated_at
                                            ? new Date(
                                                  blog.updated_at,
                                              ).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td className="py-4">
                                        <a
                                            href={`/admin/blogs/edit/${blog.id}`}
                                            className="text-sm font-medium text-gray-700 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}

                            {!blogs.length && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        No blogs yet. Create your first post.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
        </div>
    );
}
