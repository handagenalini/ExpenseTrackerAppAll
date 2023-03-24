
const path=require('path')
const rootdir=require('../utils/path')
const Expense=require('../models/expense')
exports.getexpensepage = (req, res, next) => {
    res.sendFile(path.join(rootdir,'view','index.html'))
}
exports.addexpense=async(req,res,next)=>{
    console.log('-----------------inadd')
    try{
        if(!req.body.description){
            throw new Error("enter description")
        }
        console.log('----------------in try')
      

const amount=req.body.amount
const description=req.body.description
const category=req.body.category

const data=await Expense.create({
    amount:amount,
    description:description,
    category:category

})
res.status(201).json({newExpense:data})
}catch(err){
console.log(err)
res.status(500).json({error:err})
}
}
exports.getexpense=async(req,res,next)=>{
    try{
        
        const expense=await Expense.findAll()
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
        const result=await Expense.destroy({where:{id:eid}})
        console.log(result)

        res.status(200).json(result)
    }catch(err){
        res.status(500).json({error:err})
    }



}
exports.edit=async(req,res,next)=>{
    try{
        if(!req.params.id){
            throw new Error('id is missing')
        }
    
    const eid=req.params.id
    await Expense.update({where:{id:eid}})
    res.status(200)
}catch(err){
    res.status(500).json({error:err})
}
}