"use client";

import { useEffect, useRef, useState } from "react";

export default function RichTextEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        if (!editorRef.current) return;
        if (editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const applyCommand = (command, commandValue) => {
        document.execCommand(command, false, commandValue);
        onChange(editorRef.current?.innerHTML || "");
    };

    const handleInput = () => {
        onChange(editorRef.current?.innerHTML || "");
    };

    return (
        <div className="rte">
            <div className="rte__toolbar">
                <button
                    type="button"
                    onClick={() => applyCommand("bold")}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => applyCommand("italic")}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => applyCommand("formatBlock", "h2")}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => applyCommand("insertUnorderedList")}
                >
                    List
                </button>
                <button
                    type="button"
                    onClick={() => applyCommand("createLink", prompt("URL") || "")}
                >
                    Link
                </button>
                <button
                    type="button"
                    className="rte__toggle"
                    onClick={() => setPreview((prev) => !prev)}
                >
                    {preview ? "Edit" : "Preview"}
                </button>
            </div>

            {preview ? (
                <div
                    className="article rte__preview"
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            ) : (
                <div
                    ref={editorRef}
                    className="rte__editor"
                    contentEditable
                    onInput={handleInput}
                    suppressContentEditableWarning
                />
            )}
        </div>
    );
}
