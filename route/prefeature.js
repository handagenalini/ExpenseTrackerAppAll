const express=require('express')

const authintication=require('../middleware/auth')
const featurecontroller=require('../controller/prefeature')

const router=express.Router()

router.get('/showleaderboard',authintication.authenticate,featurecontroller.leaderboard)
module.exports=router
