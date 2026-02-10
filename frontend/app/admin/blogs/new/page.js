"use client";

import { useState } from "react";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import RichTextEditor from "@/components/blog/RichTextEditor";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function NewBlogPage() {
    const [form, setForm] = useState({
        title: "",
        content: "",
        meta_title: "",
        meta_description: "",
        featured_image: "",
        status: "draft",
    });
    const [status, setStatus] = useState("");

    const updateField = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus("");

        try {
            const res = await fetch(`${API}/api/blogs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                setStatus(data.error || "Request failed");
                return;
            }

            setStatus("Blog created.");
            setForm({
                title: "",
                content: "",
                meta_title: "",
                meta_description: "",
                featured_image: "",
                status: "draft",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-white pt-24">
            <main className="mx-auto max-w-5xl px-6 pt-28 pb-24 ">
                {/* Header */}
                <header className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                            CMS
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                            New Blog
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Create a new SEO-ready article.
                        </p>
                    </div>

                    <a
                        href="/admin/blogs"
                        className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        ← Back to list
                    </a>
                </header>

                {/* Form */}
                <section className="rounded-2xl border border-gray-200 bg-white p-8">
                    <form onSubmit={submitForm} className="space-y-8">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
                                value={form.title}
                                onChange={(e) =>
                                    updateField("title", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* SEO */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Meta Title
                                </label>
                                <input
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
                                    value={form.meta_title}
                                    onChange={(e) =>
                                        updateField(
                                            "meta_title",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Meta Description
                                </label>
                                <textarea
                                    rows={3}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
                                    value={form.meta_description}
                                    onChange={(e) =>
                                        updateField(
                                            "meta_description",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Featured image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Featured Image
                            </label>
                            <input
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
                                value={form.featured_image}
                                onChange={(e) =>
                                    updateField(
                                        "featured_image",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <CloudinaryUpload
                            label="Upload Featured Image"
                            folder="o8mlabs/blog"
                            onUpload={(url) =>
                                updateField("featured_image", url)
                            }
                        />

                        {/* Content */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <RichTextEditor
                                value={form.content}
                                onChange={(val) => updateField("content", val)}
                            />
                        </div>

                        {/* Status */}
                        <div className="max-w-xs">
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
                                value={form.status}
                                onChange={(e) =>
                                    updateField("status", e.target.value)
                                }
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        {status && (
                            <p className="text-sm text-green-600">{status}</p>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`rounded-full px-6 py-2 text-sm font-medium text-white transition
        ${
            isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
        }
    `}
                            >
                                {isSubmitting ? "Creating…" : "Create Blog"}
                            </button>

                            <a
                                href="/admin/blogs"
                                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Back to list
                            </a>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
