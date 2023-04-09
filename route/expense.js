const express=require('express')

const expensecontroller=require('../controller/expense')

const authintication=require('../middleware/auth')

const router=express.Router()

router.post('/addexpense',authintication.authenticate,expensecontroller.addexpense)
router.get('/pagination',authintication.authenticate,expensecontroller.pagination)

router.get('/getexpense',authintication.authenticate, expensecontroller.getexpense)
router.delete('/deleteexpense/:id', authintication.authenticate, expensecontroller.delete)
router.delete('/editexpense/:id',authintication.authenticate, expensecontroller.edit)
router.get('/download', authintication.authenticate, expensecontroller.downloadExpense);

router.get('/downloadHistory', authintication.authenticate, expensecontroller.downloadHistory);
module.exports=router
