import { Router } from "express";
import {
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
} from "../controllers/hero.controller.js";

const router = Router();

router.get("/", getHeroSlides);
router.post("/", createHeroSlide);
router.put("/:id", updateHeroSlide);
router.delete("/:id", deleteHeroSlide);

export default router;
