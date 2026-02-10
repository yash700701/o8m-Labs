export const validateBlog = (data) => {
    const { title, content } = data;

    if (!title) return "Title is required";
    if (!content) return "Content is required";

    return null;
};
