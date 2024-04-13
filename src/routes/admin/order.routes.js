import express from "express";
import { requireSignin, adminMiddleware  } from "../../common-middleware/index.js";
import  { updateOrder,
  getCustomerOrders,
 } from "../../controller/admin/order.admin.js";
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

export default router;
