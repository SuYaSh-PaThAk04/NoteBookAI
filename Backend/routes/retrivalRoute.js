import express from "express";
import { reset, RetriveAnswer } from "../controllers/Retrival.js";

const router = express.Router();

// POST /api/retrieve
router.post("/retrieve",RetriveAnswer );
router.post("/reset",reset );

export default router;
