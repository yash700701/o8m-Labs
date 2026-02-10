"use client";

import { useEffect, useState } from "react";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function HeroAdmin() {
    const [slides, setSlides] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        media_url: "",
        media_type: "image",
        cta_text: "",
        cta_link: "",
        display_order: 0,
        is_active: true,
    });
    const [editingId, setEditingId] = useState(null);
    const [status, setStatus] = useState("");

    const loadSlides = () => {
        fetch(`${API}/api/hero?includeInactive=true`)
            .then((res) => res.json())
            .then(setSlides);
    };

    useEffect(() => {
        loadSlides();
    }, []);

    const updateField = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            media_url: "",
            media_type: "image",
            cta_text: "",
            cta_link: "",
            display_order: 0,
            is_active: true,
        });
        setEditingId(null);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setStatus("");

        const method = editingId ? "PUT" : "POST";
        const endpoint = editingId
            ? `${API}/api/hero/${editingId}`
            : `${API}/api/hero`;

        const res = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            const data = await res.json();
            setStatus(data.error || "Request failed");
            return;
        }

        resetForm();
        loadSlides();
    };

    const handleEdit = (slide) => {
        setEditingId(slide.id);
        setForm({
            title: slide.title ?? "",
            description: slide.description ?? "",
            media_url: slide.media_url ?? "",
            media_type: slide.media_type ?? "image",
            cta_text: slide.cta_text ?? "",
            cta_link: slide.cta_link ?? "",
            display_order: slide.display_order ?? 0,
            is_active: slide.is_active ?? true,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this slide?")) return;
        await fetch(`${API}/api/hero/${id}`, { method: "DELETE" });
        loadSlides();
    };

    return (
        <div className="w-full bg-white pt-24">
            <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
                {/* Header */}
                <header className="mb-16">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        CMS
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
                        Hero Slides
                    </h1>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        Update hero media, CTA copy, and display order.
                    </p>
                </header>

                {/* Form Card */}
                <section className="mb-16 text-zinc-800 rounded-2xl border border-gray-400 bg-white p-8">
                    <form onSubmit={submitForm} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.title}
                                    onChange={(e) =>
                                        updateField("title", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Media URL
                                </label>
                                <input
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.media_url}
                                    onChange={(e) =>
                                        updateField("media_url", e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <CloudinaryUpload
                            label="Upload Hero Media"
                            folder="o8mlabs/hero"
                            onUpload={(url) => updateField("media_url", url)}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                value={form.description}
                                onChange={(e) =>
                                    updateField("description", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Media Type
                                </label>
                                <select
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.media_type}
                                    onChange={(e) =>
                                        updateField(
                                            "media_type",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    CTA Text
                                </label>
                                <input
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.cta_text}
                                    onChange={(e) =>
                                        updateField("cta_text", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    CTA Link
                                </label>
                                <input
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.cta_link}
                                    onChange={(e) =>
                                        updateField("cta_link", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={form.display_order}
                                    onChange={(e) =>
                                        updateField(
                                            "display_order",
                                            Number(e.target.value),
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2"
                                    value={
                                        form.is_active ? "active" : "inactive"
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "is_active",
                                            e.target.value === "active",
                                        )
                                    }
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {status && (
                            <p className="text-sm text-red-600">{status}</p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                {editingId ? "Update Slide" : "Create Slide"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Existing Slides */}
                <section className="rounded-2xl text-zinc-800 border border-gray-400 bg-white p-8">
                    <h2 className="mb-6 text-xl text-zinc-800 font-semibold">
                        Existing Slides
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-200 text-gray-500">
                                <tr>
                                    <th className="py-3 text-left font-medium">
                                        Title
                                    </th>
                                    <th className="py-3 text-left font-medium">
                                        Media
                                    </th>
                                    <th className="py-3 text-left font-medium">
                                        Status
                                    </th>
                                    <th className="py-3 text-left font-medium">
                                        Order
                                    </th>
                                    <th className="py-3 text-left font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {slides.map((slide) => (
                                    <tr
                                        key={slide.id}
                                        className="border-b border-gray-100"
                                    >
                                        <td className="py-3">{slide.title}</td>
                                        <td className="py-3">
                                            {slide.media_type}
                                        </td>
                                        <td className="py-3">
                                            {slide.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </td>
                                        <td className="py-3">
                                            {slide.display_order}
                                        </td>
                                        <td className="py-3 flex gap-3">
                                            <button
                                                onClick={() =>
                                                    handleEdit(slide)
                                                }
                                                className="text-sm text-gray-700 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(slide.id)
                                                }
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {!slides.length && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-8 text-center text-gray-500"
                                        >
                                            No slides yet. Create your first
                                            hero slide.
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
