import express from "express";
import cors from "cors";

import heroRoutes from "./routes/hero.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import cloudinaryRoutes from "./routes/cloudinary.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hero", heroRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;
