const express=require('express')
const app=express()




const cors=require('cors')
const bodyParser = require('body-parser');  
const sequelize =require('./utils/database')                       // it gives 4 express middleware for parasing JSON, Text, URL-encoded, raw data sets over an HTTP request body... 
app.use(bodyParser.json({ extended: false}));



app.use(cors())

const routes=require('./route/user');
const Expense = require('./models/expense');
app.use(routes)


User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync().then(()=>{
// console.log(result)
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
