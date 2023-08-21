import express from 'express';
const router = express.Router();
import signup from '../../controller/admin/auth.js'
import {signin ,signout} from "../../controller/admin/auth.js"
import {requireSignin} from "../../common-middleware/index.js"
import {validateSignupRequest, isRequestValidated, validateSigninRequest} from "../../validators/auth.js"

router.post('/admin/signup',validateSignupRequest, isRequestValidated,signup)

router.post('/admin/signin', validateSigninRequest, isRequestValidated,signin)

router.post('/admin/signout',requireSignin,signout)

router.post('/profile',requireSignin,(req,res) => {
  res.status(200).json({user:'profile'})
});

export default router;