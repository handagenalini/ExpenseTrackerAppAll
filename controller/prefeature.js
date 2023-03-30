const User=require('../models/user')
const Expense=require('../models/expense')

exports.leaderboard=async(req,res,next)=>{
    try{
const user=await User.findAll()
const expense=await Expense.findAll()
const useraggregatedexpenses={}
expense.forEach(expense=>{
    if(useraggregatedexpenses[expense.userId]){
        useraggregatedexpenses[expense.userId]=useraggregatedexpenses[expense.userId]+expense.amount
    }
    else{
        useraggregatedexpenses[expense.userId]=expense.amount
    }
  

})
console.log(useraggregatedexpenses,'--------------------aggregated')
userdetails=[]
user.forEach(user=>{
    userdetails.push({name:user.name,total_cost:useraggregatedexpenses[user.id]})
})
console.log(userdetails)
userdetails.sort((a,b)=>{
    return b.total_cost-a.total_cost
})
console.log(userdetails)
res.status(200).json(userdetails)
    }catch(err){
        res.status(500).json({error:err})
    }
}