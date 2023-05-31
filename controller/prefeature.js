const User=require('../models/user')
const Expense=require('../models/expense')
const sequelize = require('../utils/database')




exports.leaderboard=async(req,res,next)=>{
    try{
        console.log('in leaderboard')
   
    const user = await User.aggregate([
        {
          $sort: { Totalexpense: -1 } // Sort by Totalexpense in descending order
        }
      ]);
    // console.log(user)

return res.status(200).json(user)
    }catch(err){
        res.status(500).json({error:err})
    }
}

// exports.updateexpense=async(req,res,next)=>{
//     try{
// const totalexpense=req.body.expense
// console.log(totalexpense,'------------------------------in expense ')
// user.id=req.user.id
// const data=await User.findone({where:{id:user.id}})
// console.log(data)
//     if(user.id){
// const newexpense=await User.update({
//     Totalexpense:totalexpense

//   })
//   return res.status(201).json(newexpense)
//     }

//     }
//    catch(err)
//    {
//     res.status(500).json({error:err})
//    }
// }