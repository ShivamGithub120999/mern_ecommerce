import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
const router = express.Router();
import signup from '../controller/auth.js'
import {signin} from "../controller/auth.js"
import {requireSignin} from "../controller/auth.js"
router.post('/signup',signup)

router.post('/signin',signin)

router.post('/profile',requireSignin,(req,res) => {
  res.status(200).json({user:'profile'})
});

export default router;