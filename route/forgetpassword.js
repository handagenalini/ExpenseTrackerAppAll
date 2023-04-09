const express=require('express')


const authintication=require('../middleware/auth')


const passwordcontroller=require('../controller/forgetpassword')

const router=express.Router()

router.post('/forgotpassword',passwordcontroller.forgotpassword)

router.get('/resetpassword/:id', passwordcontroller.resetpassword)

router.get('/updatepassword/:id', passwordcontroller.updatepassword)
module.exports=router
