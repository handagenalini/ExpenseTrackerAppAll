const express=require('express')

const signupcontroller=require('../controller/signup')
const expensecontroller=require('../controller/expense')
const authintication=require('../middleware/auth')
const premiumcontroller=require('../controller/premium')
const featurecontroller=require('../controller/prefeature')
const passwordcontroller=require('../controller/forgetpassword')
const router=express.Router()


router.get('/',signupcontroller.getsignuppage)
router.post('/add',signupcontroller.postsignup)
router.post(`/login`,signupcontroller.login)


router.post('/addexpense',authintication.authenticate,expensecontroller.addexpense)
router.get('/pagination',authintication.authenticate,expensecontroller.pagination)

router.get('/getexpense',authintication.authenticate, expensecontroller.getexpense)
router.delete('/deleteexpense/:id', authintication.authenticate, expensecontroller.delete)
router.delete('/editexpense/:id',authintication.authenticate, expensecontroller.edit)
router.get('/download', authintication.authenticate, expensecontroller.downloadExpense);

router.get('/downloadHistory', authintication.authenticate, expensecontroller.downloadHistory);


router.get('/premium',authintication.authenticate,premiumcontroller.purchasepremium)
router.post('/update',authintication.authenticate,premiumcontroller.updateTransactionStatus)

router.get('/showleaderboard',authintication.authenticate,featurecontroller.leaderboard)

router.post('/forgotpassword',passwordcontroller.forgotpassword)

router.get('/resetpassword/:id', passwordcontroller.resetpassword)

router.get('/updatepassword/:id', passwordcontroller.updatepassword)




module.exports=router