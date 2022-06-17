import express from 'express';
const router = express.Router();
import signup from '../../controller/admin/auth.js'
import {signin} from "../../controller/admin/auth.js"
import {requireSignin} from "../../controller/admin/auth.js"

router.post('/admin/signup',signup)

router.post('/admin/signin',signin)

router.post('/profile',requireSignin,(req,res) => {
  res.status(200).json({user:'profile'})
});

export default router;