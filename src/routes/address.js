import express from 'express';
import { requireSignin, userMiddleware } from "../common-middleware/index.js";
import { addAddress, getAddress } from  '../controller/address.js';
const router = express.Router();


router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

export default router;