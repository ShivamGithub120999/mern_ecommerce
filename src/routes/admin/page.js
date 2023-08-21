import express from 'express'
import { requireSignin, adminMiddleware } from '../../common-middleware/index.js';
import { createPage, getPage} from '../../controller/admin/page.js';
import {upload} from "../../common-middleware/index.js";
const router = express.Router();

router.post(`/page/create`, requireSignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)


router.get(`/page/:category/:type`, getPage);

export default router;