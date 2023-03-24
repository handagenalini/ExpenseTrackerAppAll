
const path=require('path')
const bcrypt=require('bcrypt')
const rootdir=require('../utils/path')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
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
     const email=req.body.email
    //  User.findAll({ where : { email }}).then(user => {
    //     if(user.length>0){
    //       return  res.status(506).json({err:'user already exist'})
    //     }
    //  })
    const name=req.body.name
 
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
// function generateAccessToken(id) {
//     console.log('-----------------------------------')
//     return jwt.sign(id ,process.env.TOKEN_SECRET);
// }
exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    User.findAll({ where : { email }}).then(user => {
        if(user.length > 0){
            if(user[0].password===password) {
                res.json({success: true, message: 'Successfully Logged In'})
                // Send JWT
                } else {
                // response is OutgoingMessage object that server response http request
                return res.status(401).json({success: false, message: 'passwords do not match'});
                }
            
        } else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
}
