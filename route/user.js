const express=require('express')

const signupcontroller=require('../controller/signup')
const router=express.Router()
router.get('/',signupcontroller.getsignuppage)


router.post('/add',signupcontroller.postsignup)
router.post(`/login`,signupcontroller.login)
module.exports=router