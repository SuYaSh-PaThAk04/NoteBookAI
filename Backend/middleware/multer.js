import multer from 'multer';
import fs from 'fs';

// uploads folder ensure karein
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Export single file middleware
export const uploadPDF = multer({ storage }).single('pdf');
