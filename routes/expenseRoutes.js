const express = require("express");
const router = express.Router();
const expCtrl = require('../controller/expenseCtrl');
const authMiddleware = require('../middleware/jwt')

router.get('/add-expense',expCtrl.getExpensePage);

router.post('/add-expense',authMiddleware,expCtrl.postExpense);
router.get('/get-expense',authMiddleware,expCtrl.getExpense)
router.delete('/delete/:id',authMiddleware,expCtrl.deleteExp);

router.get('/download',authMiddleware,expCtrl.downloadExp);


module.exports = router;