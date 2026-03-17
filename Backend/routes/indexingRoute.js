import express from 'express';
import { uploadPDF } from '../middleware/multer.js';
import {  getUploadedFiles, indexFile } from '../controllers/indexing.js';
import { indexWeb } from '../controllers/webIndex.js';
import { deleteText, indexText } from '../controllers/textIndex.js';



const router = express.Router();

router.post('/upload', uploadPDF, indexFile);

router.get("/getFiles",getUploadedFiles)

router.post("/uploadWeb",indexWeb)
router.post("/indexText",indexText)
router.post("/deleteText",deleteText)


export default router;
