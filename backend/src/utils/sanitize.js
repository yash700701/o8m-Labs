export const sanitize = (str = "") =>
    str.replace(/<script.*?>.*?<\/script>/gi, "");
