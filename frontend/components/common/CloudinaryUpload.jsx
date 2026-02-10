"use client";

import { useState } from "react";

export default function CloudinaryUpload({ label, onUpload, folder }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    // const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloudName = 'dmoipkzuf';
    const apiKey = '239465828986373';
    // const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiBase =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    const handleFile = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setError("");

        if (!cloudName || !apiKey) {
            setError("Missing Cloudinary env vars.");
            return;
        }

        setUploading(true);
        try {
            const signRes = await fetch(`${apiBase}/api/cloudinary/sign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folder })
            });

            if (!signRes.ok) throw new Error("Signature failed");
            const signData = await signRes.json();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signData.apiKey || apiKey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            if (folder) formData.append("folder", folder);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            onUpload(data.secure_url);
        } catch (err) {
            setError("Upload failed. Check Cloudinary settings.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="form">
            <label>{label}</label>
            <input type="file" onChange={handleFile} />
            {uploading && <p>Uploading...</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
}
