import { query } from "../db/index.js";
import { validateHero } from "../validators/hero.validator.js";

export const getHeroSlides = async (req, res) => {
    const includeInactive = req.query.includeInactive === "true";
    const sql = includeInactive
        ? "SELECT * FROM hero_slides ORDER BY display_order ASC"
        : "SELECT * FROM hero_slides WHERE is_active = true ORDER BY display_order ASC";
    const result = await query(sql);
    res.json(result.rows);
};

export const createHeroSlide = async (req, res) => {
    const error = validateHero(req.body);
    if (error) return res.status(400).json({ error });

    const {
        title,
        description,
        media_url,
        media_type,
        cta_text,
        cta_link,
        display_order,
        is_active
    } = req.body;

    const result = await query(
        `INSERT INTO hero_slides
        (title, description, media_url, media_type, cta_text, cta_link, display_order, is_active)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *`,
        [
            title,
            description,
            media_url,
            media_type,
            cta_text,
            cta_link,
            display_order ?? 0,
            is_active ?? true
        ]
    );

    res.status(201).json(result.rows[0]);
};

export const updateHeroSlide = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        media_url,
        media_type,
        cta_text,
        cta_link,
        display_order,
        is_active
    } = req.body;

    if (
        title === undefined &&
        description === undefined &&
        media_url === undefined &&
        media_type === undefined &&
        cta_text === undefined &&
        cta_link === undefined &&
        display_order === undefined &&
        is_active === undefined
    ) {
        return res.status(400).json({ error: "No fields to update" });
    }

    if (media_type && !["image", "video"].includes(media_type)) {
        return res.status(400).json({ error: "Invalid media type" });
    }

    const fields = [];
    const values = [];
    let idx = 1;

    const addField = (name, value) => {
        fields.push(`${name} = $${idx++}`);
        values.push(value);
    };

    if (title !== undefined) addField("title", title);
    if (description !== undefined) addField("description", description);
    if (media_url !== undefined) addField("media_url", media_url);
    if (media_type !== undefined) addField("media_type", media_type);
    if (cta_text !== undefined) addField("cta_text", cta_text);
    if (cta_link !== undefined) addField("cta_link", cta_link);
    if (display_order !== undefined) addField("display_order", display_order);
    if (is_active !== undefined) addField("is_active", is_active);

    values.push(id);
    const result = await query(
        `UPDATE hero_slides SET ${fields.join(", ")} WHERE id = $${
            values.length
        } RETURNING *`,
        values
    );

    if (!result.rows.length)
        return res.status(404).json({ error: "Hero slide not found" });

    res.json(result.rows[0]);
};

export const deleteHeroSlide = async (req, res) => {
    const { id } = req.params;
    const result = await query(
        "DELETE FROM hero_slides WHERE id = $1 RETURNING id",
        [id]
    );

    if (!result.rows.length)
        return res.status(404).json({ error: "Hero slide not found" });

    res.json({ success: true });
};
