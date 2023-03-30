const express=require('express')

const signupcontroller=require('../controller/signup')
const expensecontroller=require('../controller/expense')
const authintication=require('../middleware/auth')
const premiumcontroller=require('../controller/premium')
const featurecontroller=require('../controller/prefeature')
const router=express.Router()


router.get('/',signupcontroller.getsignuppage)
router.post('/add',signupcontroller.postsignup)
router.post(`/login`,signupcontroller.login)


router.post('/addexpense',authintication.authenticate,expensecontroller.addexpense)
router.get('/getexpense',authintication.authenticate, expensecontroller.getexpense)
router.delete('/deleteexpense/:id', authintication.authenticate, expensecontroller.delete)
router.delete('/editexpense/:id',authintication.authenticate, expensecontroller.edit)


router.get('/premium',authintication.authenticate,premiumcontroller.purchasepremium)
router.post('/update',authintication.authenticate,premiumcontroller.updateTransactionStatus)

router.get('/showleaderboard',authintication.authenticate,featurecontroller.leaderboard)

module.exports=router