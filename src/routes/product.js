import express from 'express';
import { requireSignin } from "../common-middleware/index.js"
import { adminMiddleware } from "../common-middleware/index.js"
import  Product  from "../models/product.js"
import { createProduct } from "../controller/product.js"
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

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

router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
//router.get('/category/getcategory',getCategories);

export default router;