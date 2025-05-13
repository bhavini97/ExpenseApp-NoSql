const express = require("express");
const router = express.Router();
const orderCtrl = require('../controller/orderCtrl');
const authMiddleware = require('../middleware/jwt')

router.get('/makePayment',orderCtrl.makePaymentPage);
router.post('/pay',authMiddleware,orderCtrl.postPaymentOrder);
router.get('/payment-status/:orderId',authMiddleware,orderCtrl.getPaymentStatus);

module.exports = router
