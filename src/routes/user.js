import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
const router = express.Router();
import User from "../models/user.js"
//const {signup} = require('../controller/user.js')
import signup from '../controller/user.js'
router.post('/signup',signup)

router.post('/signin',(req,res) => {
  console.log("I am here")
})

export default router;