const express=require('express')


const premiumcontroller=require('../controller/premium')

const authintication=require('../middleware/auth')
const router=express.Router()

router.get('/premium',authintication.authenticate,premiumcontroller.purchasepremium)
router.post('/update',authintication.authenticate,premiumcontroller.updateTransactionStatus)
module.exports=router
