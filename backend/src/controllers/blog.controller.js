import { query } from "../db/index.js";
import { validateBlog } from "../validators/blog.validator.js";
import { slugify } from "../utils/slugify.js";
import { sanitize } from "../utils/sanitize.js";

export const getBlogs = async (req, res) => {
    const status = req.query.status;

    if (!status || status === "published") {
        const result = await query(
            "SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC"
        );
        return res.json(result.rows);
    }

    if (status === "all") {
        const result = await query(
            "SELECT * FROM blogs ORDER BY created_at DESC"
        );
        return res.json(result.rows);
    }

    if (status === "draft") {
        const result = await query(
            "SELECT * FROM blogs WHERE status = 'draft' ORDER BY created_at DESC"
        );
        return res.json(result.rows);
    }

    return res.status(400).json({ error: "Invalid status filter" });
};

export const getBlogBySlug = async (req, res) => {
    const { slug } = req.params;

    const result = await query(
        "SELECT * FROM blogs WHERE slug = $1 AND status = 'published'",
        [slug]
    );

    if (!result.rows.length)
        return res.status(404).json({ error: "Blog not found" });

    res.json(result.rows[0]);
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;

    if (!id || !/^[0-9a-fA-F-]{36}$/.test(id)) {
        return res.status(400).json({ error: "Invalid blog id" });
    }

    const result = await query("SELECT * FROM blogs WHERE id = $1", [id]);

    if (!result.rows.length)
        return res.status(404).json({ error: "Blog not found" });

    res.json(result.rows[0]);
};

export const createBlog = async (req, res) => {
    const error = validateBlog(req.body);
    if (error) return res.status(400).json({ error });

    const {
        title,
        content,
        meta_title,
        meta_description,
        featured_image,
        status
    } = req.body;

    const slug = slugify(title);

    const existing = await query("SELECT id FROM blogs WHERE slug = $1", [slug]);
    if (existing.rows.length)
        return res.status(409).json({ error: "Slug already exists" });

    const result = await query(
        `INSERT INTO blogs
        (title, slug, content, meta_title, meta_description, featured_image, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
            title,
            slug,
            sanitize(content),
            meta_title,
            meta_description,
            featured_image,
            status ?? "draft"
        ]
    );

    res.status(201).json(result.rows[0]);
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        content,
        meta_title,
        meta_description,
        featured_image,
        status
    } = req.body;

    if (
        title === undefined &&
        content === undefined &&
        meta_title === undefined &&
        meta_description === undefined &&
        featured_image === undefined &&
        status === undefined
    ) {
        return res.status(400).json({ error: "No fields to update" });
    }

    if (status && !["draft", "published"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    let slug;
    if (title) {
        slug = slugify(title);
        const existing = await query(
            "SELECT id FROM blogs WHERE slug = $1 AND id <> $2",
            [slug, id]
        );
        if (existing.rows.length)
            return res.status(409).json({ error: "Slug already exists" });
    }

    const fields = [];
    const values = [];
    let idx = 1;

    const addField = (name, value) => {
        fields.push(`${name} = $${idx++}`);
        values.push(value);
    };

    if (title !== undefined) addField("title", title);
    if (slug !== undefined) addField("slug", slug);
    if (content !== undefined) addField("content", sanitize(content));
    if (meta_title !== undefined) addField("meta_title", meta_title);
    if (meta_description !== undefined)
        addField("meta_description", meta_description);
    if (featured_image !== undefined)
        addField("featured_image", featured_image);
    if (status !== undefined) addField("status", status);

    values.push(id);
    const result = await query(
        `UPDATE blogs SET ${fields.join(", ")} WHERE id = $${
            values.length
        } RETURNING *`,
        values
    );

    if (!result.rows.length)
        return res.status(404).json({ error: "Blog not found" });

    res.json(result.rows[0]);
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const result = await query(
        "DELETE FROM blogs WHERE id = $1 RETURNING id",
        [id]
    );

    if (!result.rows.length)
        return res.status(404).json({ error: "Blog not found" });

    res.json({ success: true });
};
