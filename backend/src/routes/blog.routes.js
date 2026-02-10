import { Router } from "express";
import {
    getBlogs,
    getBlogBySlug,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/", getBlogs);
router.get("/id/:id", getBlogById);
router.get("/:slug", getBlogBySlug);
router.post("/", createBlog);
router.put("/id/:id", updateBlog);
router.delete("/id/:id", deleteBlog);

export default router;
