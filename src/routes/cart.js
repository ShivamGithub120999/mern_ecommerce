import express from 'express';

import { addItemToCart, getCartItems } from "../controller/cart.js"
import { getCategories } from "../controller/category.js"
import { requireSignin, userMiddleware } from "../common-middleware/index.js"

const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);
router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);

export default router;