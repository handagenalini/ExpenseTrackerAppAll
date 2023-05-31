
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Forgotpassword = require('../models/forgetpassword');
const Sib = require('sib-api-v3-sdk');

const sequelize=require('../utils/database');


const {v4: uuidv4}= require('uuid');
require('dotenv').config();





exports.forgotpassword= async(req,res,next)=>{

        const {email}= req.body;
        
  const user= await User.findOne({where: {email}})

  console.log('forgot user>>>', user.email)
  if(user.email){
    const id=uuidv4()
    const createForgotpassword= await Forgotpassword.create({
        id:id,
        active:true,
        userId:user.id
    })
    console.log(createForgotpassword,'---------------------in forgot')

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

// create a transactional email message
let sendSmtpEmail = new Sib.SendSmtpEmail();
sendSmtpEmail.to = [{ "email": email }];
sendSmtpEmail.sender = { "email": "abrarquraishi96@gmail.com", "name": "nalini" };
sendSmtpEmail.subject = "Reset-Password";
sendSmtpEmail.textContent = "Hey Click below to reset Your Password";
sendSmtpEmail.htmlContent = `<form onsubmit="submitPass(event)" ><a href="http://localhost:3000/resetpassword/${id}">Reset Password</a></form>`;
console.log(sendSmtpEmail.htmlContent)

// send the email
const apiInstance = new Sib.TransactionalEmailsApi();
apiInstance.sendTransacEmail(sendSmtpEmail)
.then(
res.status(200).json({ message: "Email sent successfully.", uuid :id })
)

.catch((err) => {
    console.log(err)
res.status(500).json({ error: err, message: false })
});

}
}
exports.resetpassword= async(req,res,next)=>{
    try{
  const forgotid=req.params.id
  const forgotpassword= await Forgotpassword.findOne({where:{id:forgotid}})    
  console.log(forgotpassword)

  if(forgotpassword.active){
    forgotpassword.update({active:false})

   return res.status(200).send(`
                          <html>
                          <body>
              <form action="http://localhost:3000/updatepassword/${forgotid}" name="resetform" id="resetform" method="get">
              <label for="password">Enter New Password</label><br>
              <input type="password" name="password" id="password" required/><br><br>
              <button type="submit" >Set password</button><br><br>
              </form>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
           
              <script>
              document.getElementById("resetform").addEventListener('sumbit', formSubmit)
              const pass = document.getElementById("password")
             async function formSubmit(e){
                e.preventDefault();
                console.log('called')
               
              }
              </script>
                  
              </body>
    
              </html> `)
    res.end();
  }else{
    res.send('<body>Reset Link Expired</body>')
    res.end();
  }
    }catch(err){
       res.status(500).json({success:false, error:err})
       console.log('Error>>>',err)
       throw new Error(JSON.stringify(err))
    }

}


exports.updatepassword=async (req,res,next)=>{
   try{
 const {password} = req.query;
 const forgotid= req.params.id;
 console.log('checking newp and forgotid',password,forgotid)
 const user = await Forgotpassword.findOne({where:{id:forgotid}})
const userId= user.userId;
const saltRounds= 10 ;
bcrypt.genSalt(saltRounds, function(err,salt){
    if(err){
        console.log(err)
        throw new Error(err);
    }

bcrypt.hash(password, salt, async function(err,hash){
    if(err){
        console.log(err);
        throw new Error(err);
    }
    const response = await User.update({
        password:hash},
        {where:{id:userId}})
      return res.status(201).json({message:'Successfully updated the new password', response:response})
    })
})
   }catch(err){
    console.log(err);
    return res.status(500).json({message:err})
   }
}
