import multer from 'multer';
import createHttpError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fieldSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return cb(createHttpError(400, '.exe not valid extension'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
