
const path=require('path')
const rootdir=require('../utils/path')
const Expense=require('../models/expense')
const User=require('../models/user')
const sequelize=require('../utils/database')
const Report=require('../models/report')
const UserServices= require('../services/userservices');
const S3Services= require('../services/s3services');

exports.addexpense=async(req,res,next)=>{
    // const t= await sequelize.transaction()
    console.log('-----------------inadd')
    
        if(!req.body.description){
            throw new Error("enter description")
        }
        console.log('----------------in try')
      
        try{
const amount=req.body.amount
const description=req.body.description
const category=req.body.category

const data=await Expense.create({
    amount:amount,description:description,category:category, userId:req.user.id})
    
    
        console.log('in update')
        const totalexpense=Number(req.user.Totalexpense)+Number(amount)
        console.log(totalexpense)
        try{
      const update= await User.updateOne({_id:req.user.id} ,{Totalexpense:totalexpense}
        )
        console.log(update,'-------------------------------------------')
    }catch(err){
        console.log(err)
    }
   
    res.status(200).json({expense:data})
 
}catch(err){
console.log(err)
    res.status(500).json({success:false,error:err})
}
}
// exports.pagination=async (req,res,next)=>{
//     console.log('in pagination---------------')
// const pagenumber=parseInt(req.query.page)
// const Limit=req.query.limit
// console.log(Limit)
// const limit=parseInt(Limit)
// console.log(limit,'-----------------')

// // const startIndex=(pagenumber-1)*limit
// // const endIndex=pagenumber*limit

// await Expense.find({userId:req.user.id}).skip(limit*(pagenumber-1)).limit(limit)
// .then(
//     expense => {return res.json({Expenses:expense , success:true,user:req.user})
// })
// .catch(err => {
//     return res.status(403).json({success : false, error: err})
// })
// }
exports.pagination = async (req, res, next) => {
    try {
      console.log('in pagination---------------');
      const pageNumber = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      console.log(pageNumber,limit)
      startindex=(pageNumber-1)*limit
      console.log(startindex)
  
      await Expense.find({ userId: req.user.id })
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .then((expenses) => {
          return res.json({ Expenses: expenses, success: true, user: req.user });
        })
        .catch((err) => {
            console.log(err)
          return res.status(403).json({ success: false, error: err });
        });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ success: false, error: err });
    }
  };
  

exports.getexpense=async(req,res,next)=>{
    try{
        
        const expense=await Expense.find({userId:req.user.id})
        console.log(expense)
        res.status(200).json({allExpense:expense})
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}
exports.delete=async(req,res,next)=>{
    console.log('-----------in delete')
    console.log(req.params.id)

    
    try{
        console.log(req.params.id)
        if(!req.params.id){
            throw new Error('id is missing')
            
        }
        const eid=req.params.id
        console.log(eid)
        const resp= await Expense.findByIdAndDelete(eid        
          )
          console.log(resp)
        const totalexpense=Number(req.user.Totalexpense)-Number(resp.amount)
        console.log(totalexpense)
      const update= await User.updateOne({_id:req.user.id
        },{
          
            Totalexpense:totalexpense
        }
        )
        console.log(update)
       res.status(200).json(resp)
        
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }



}
exports.edit=async(req,res,next)=>{
    try{
        if(!req.params.id){
            throw new Error('id is missing')
        }
    
    const eid=req.params.id
    const resp=await Expense.updateOne({id:eid,userId:req.user.id}) 
    const totalexpense=Number(req.user.Totalexpense)-Number(resp.amount)
    console.log(totalexpense)
  const update= await User.updateOne({_id:req.user.id
    },{
      
        Totalexpense:totalexpense
    }
    )
    console.log(update)

    res.status(200)
}catch(err){
    res.status(500).json({error:err})
}
}


exports.downloadExpense= async (req,res)=>{
    console.log('-----------------------------in download expense')
    try{
     const expenses = await UserServices.getExpenses(req);          // if wanyt where u can add..to get sepcific expense using id
     console.log(expenses)
     const stringfiedExpense= JSON.stringify({expenses})
     // each time while downloading i amgetting same file means overriding,,,so to download new we will use userid and date...
     const userId= req.user.id;
    
     const filename=`expensesnalini${userId}/${new Date()}.txt`;            // added date and userId in file name... i will get new file when downloading...
     const fileUrl = await S3Services.uploadToS3(stringfiedExpense, filename)            // since uploadToS3() is asyncronous task it will put call back quese moved to next line... i will get fileurl.. so i will do to wait for the task complete uploadToS3()..so i will use await with promise call back.. 
     console.log(fileUrl);
    
     const report= await Report.create({
                                       fileUrl:fileUrl,
                                       userId:req.user.id
     })
     return res.status(200).json({fileUrl,response:report, success:true, message: "downloaded Successfully"})
     
    }catch(err){
    console.log(err)
    return res.status(500).json({fileUrl:'', success:false, message:'Failed', err:err})
    }
    
    }
    
    exports.downloadHistory= async (req,res)=>{
      try{
        const download= await Report.findOne({where:{userId:req.user.id}})
        res.status(200).json({success:true, downloadReport:download})
    
    }catch(err){
      console.log(err)
      return res.status(500).json({fileUrl:'', success:false, message:'Failed', err:err})
      }
      
      }