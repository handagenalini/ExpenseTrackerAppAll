const express=require('express')
const app=express()
// const helmet=require('helmet')
const cors=require('cors')
const bodyParser = require('body-parser'); 
const path=require('path')
// const morgan= require('morgan')
const fs=require('fs')
// const accesslogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
const sequelize =require('./utils/database')                       // it gives 4 express middleware for parasing JSON, Text, URL-encoded, raw data sets over an HTTP request body... 
app.use(bodyParser.json({ extended: false}));
app.use(cors())
// app.use(helmet())
// app.use(morgan('combined',{stream:accesslogstream}))


const routes=require('./route/user');
const expense=require('./route/expense');
const password=require('./route/forgetpassword');
const prefeature=require('./route/prefeature');
const premium=require('./route/premium');


const Expense = require('./models/expense');
const Order=require('./models/order')
const User=require('./models/user')
const Forgotpassword=require('./models/forgetpassword')
const Report = require('./models/report');


app.use(routes)
app.use(expense)
app.use(prefeature)
app.use(password)
app.use(premium)

const dotenv = require('dotenv');

dotenv.config();

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,`views/${req.url}`))
})
User.hasMany(Expense)
Expense.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Forgotpassword)
Forgotpassword.belongsTo(User)
User.hasMany(Report);
Report.belongsTo(User);




sequelize.sync().then(()=>{
// console.log(result)
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
