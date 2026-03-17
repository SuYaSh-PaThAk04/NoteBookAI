import express from "express";
import {indexYoutube } from "../controllers/IndexingYouTube.js";
import { deleteIndexedItem } from "../controllers/deleteItem.js";


const router=express.Router();

router.post("/youtubeindex",indexYoutube)
router.post("/deleteItem",deleteIndexedItem)

export default router