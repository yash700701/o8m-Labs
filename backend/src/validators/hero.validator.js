export const validateHero = (data) => {
    const { title, media_url, media_type } = data;

    if (!title) return "Title is required";
    if (!media_url) return "Media URL is required";
    if (!["image", "video"].includes(media_type))
        return "Invalid media type";

    return null;
};
