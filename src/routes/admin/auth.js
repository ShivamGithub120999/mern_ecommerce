import express from 'express';
const router = express.Router();
import signup from '../../controller/admin/auth.js'
import {signin} from "../../controller/admin/auth.js"
import {requireSignin} from "../../controller/admin/auth.js"
import {validateSignupRequest, isRequestValidated, validateSigninRequest} from "../../validators/auth.js"

router.post('/admin/signup',validateSignupRequest, isRequestValidated,signup)

router.post('/admin/signin', validateSigninRequest, isRequestValidated,signin)

router.post('/profile',requireSignin,(req,res) => {
  res.status(200).json({user:'profile'})
});

export default router;