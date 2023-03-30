

const Razorpay = require('razorpay');
const Order = require('../models/order')
const signupcontroller = require('./signup')
const jwt=require('jsonwebtoken')
const purchasepremium=async(req,res,next)=>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount=100
        rzp.orders.create({amount,currency:'INR'},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid:order.id,status:'pending'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            }).catch((err)=>{
                throw new Error(err)

            })
        })
    }catch(err){
        res.status(403).json({message:'something went wrong',error:err})
    }
}

const generateAccessToken = (id, name,ispremiumuser) => {
    return jwt.sign({ userId : id, name: name,ispremiumuser} ,'secretkey');
}

 const updateTransactionStatus = async (req, res ) => {
    try {
        console.log('--------------------------------------------in update')
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({where : {orderid : order_id}}) //2
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token:generateAccessToken(userId,undefined ,true)});
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}
