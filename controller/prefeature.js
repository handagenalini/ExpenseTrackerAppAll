const User=require('../models/user')
const Expense=require('../models/expense')
const sequelize = require('../utils/database')

exports.leaderboard=async(req,res,next)=>{
    try{
        console.log('in leaderboard')
    const user=await User.findAll({
        attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost'] ],
        include: [
            {
                model: Expense,
                attributes: []
            }
        ],
        group:['user.id'],
        order:[['total_cost', 'DESC']]

    })

res.status(200).json(user)
    }catch(err){
        res.status(500).json({error:err})
    }
}