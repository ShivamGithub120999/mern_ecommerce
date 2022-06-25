import express from 'express';

import { addCategory } from ".././controller/category.js"
import { getCategories } from "../controller/category.js"
import { requireSignin } from "../common-middleware/index.js"
import { adminMiddleware } from "../common-middleware/index.js"

const router = express.Router();

router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/getcategory',getCategories);

export default router;