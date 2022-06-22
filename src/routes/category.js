import express from 'express';

import { addCategory } from ".././controller/category.js"
import { getCategories } from "../controller/category.js"

const router = express.Router();

router.post('/category/create',addCategory);
router.get('/category/getcategory',getCategories);

export default router;