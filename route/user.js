const express=require('express')

const signupcontroller=require('../controller/signup')
const expensecontroller=require('../controller/expense')
const router=express.Router()
router.get('/',signupcontroller.getsignuppage)
router.post('/add',signupcontroller.postsignup)
router.post(`/login`,signupcontroller.login)
router.post('/addexpense',expensecontroller.addexpense)
router.get('/getexpense',expensecontroller.getexpense)
router.delete('/deleteexpense/:id',expensecontroller.delete)
router.delete('/editexpense/:id',expensecontroller.edit)
module.exports=router