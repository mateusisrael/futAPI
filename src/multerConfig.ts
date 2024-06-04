import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
