
const path=require('path')
const bcrypt=require('bcrypt')
const rootdir=require('../utils/path')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
// exports.getsignuppage = (req, res, next) => {
//     console.log("-------------------------")
//     res.sendFile(path.join(rootdir,'views','signup.html'))
// }
exports.postsignup=async(req,res,next)=>{
    console.log("-------------------------1signup")

    try{
     if(!req.body.email){
        throw new Error('please enter email')
     }
     const email=req.body.email
     const name=req.body.name
 
    const password=req.body.password

    //  User.findAll({ where : { email }}).then(user => {
    //     if(user.length>0){
    //       return  res.status(506).json({err:'user already exist'})
    //     }
    //  })
    const saltrounds=10
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
   
    const user=await User.create({
        name:name,email:email,password:hash
    })
    return res.status(201).json({message:'user created successfully'})
})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err})
    }
}
const generateAccessToken = (id, name,ispremiumuser) => {
    return jwt.sign({ userId : id, name: name,ispremiumuser} ,'secretkey');
}
exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log(password);
    User.findAll({ where : { email }}).then(user => {
        if(user.length > 0){
            bcrypt.compare(password,user[0].password,(err,result)=> {
                if(err){
                    res.status(500).json({message:'somwthing went wrong'})
                }
                if(result === true){
                    console.log(user[0].ispremiumuser,'------------------------------------------')
                    return res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name,user[0].ispremiumuser)})
                }
                // Send JWT
        
                 else {
                // response is OutgoingMessage object that server response http request
                return res.status(401).json({success: false, message: 'passwords do not match'});
                }
            })
            
        } else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
}