const express=require('express')

const signupcontroller=require('../controller/signup')
const expensecontroller=require('../controller/expense')
const authintication=require('../middleware/auth')
const router=express.Router()
router.get('/',signupcontroller.getsignuppage)
router.post('/add',signupcontroller.postsignup)
router.post(`/login`,signupcontroller.login)
router.post('/addexpense',authintication.authenticate,expensecontroller.addexpense)
router.get('/getexpense',authintication.authenticate, expensecontroller.getexpense)
router.delete('/deleteexpense/:id', authintication.authenticate, expensecontroller.delete)
router.delete('/editexpense/:id',authintication.authenticate, expensecontroller.edit)
module.exports=router