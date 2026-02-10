import cloudinary from "../utils/cloudinary.js";

export const getUploadSignature = (req, res) => {
    const { folder } = req.body || {};

    if (
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET ||
        !process.env.CLOUDINARY_CLOUD_NAME
    ) {
        return res
            .status(500)
            .json({ error: "Cloudinary env vars missing" });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
        timestamp
    };

    if (folder) paramsToSign.folder = folder;

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
    );

    res.json({
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
    });
};
