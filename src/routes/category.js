import express from 'express';

import { addCategory, updateCategories,deleteCategories } from ".././controller/category.js"
import { getCategories } from "../controller/category.js"
import { requireSignin } from "../common-middleware/index.js"
import { adminMiddleware } from "../common-middleware/index.js"

const router = express.Router();
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"))
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage });

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/update', upload.array('categoryImage'), updateCategories);
router.post("/category/delete", requireSignin, adminMiddleware,deleteCategories);

export default router;