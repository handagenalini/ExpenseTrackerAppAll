
const path=require('path')
const rootdir=require('../utils/path')
const User=require('../models/user')
exports.getsignuppage = (req, res, next) => {
    console.log("-------------------------")
    res.sendFile(path.join(rootdir,'views','signup.html'))
}
exports.postsignup=async(req,res,next)=>{
    console.log("-------------------------1signup")

    try{
     if(!req.body.email){
        throw new Error('please enter email')
     }
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const user=await User.create({
        name:name,email:email,password:password
    })
    return res.status(201).json({newUser:user})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err})
    }
}
