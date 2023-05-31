const express=require('express')
const app=express()

const cors=require('cors')
const bodyParser = require('body-parser'); 
const path=require('path')



// const mongoConnect =require('./utils/database').mongoConnect
const mongoose = require('mongoose')  
app.use(bodyParser.json({ extended: false}));
app.use(cors())



const routes=require('./route/user');
const expense=require('./route/expense');
const password=require('./route/forgetpassword');
const prefeature=require('./route/prefeature');
const premium=require('./route/premium');


// const Expense = require('./models/expense');
// const Order=require('./models/order')
// const User=require('./models/user')
// const Forgotpassword=require('./models/forgetpassword')
// const Report = require('./models/report');


app.use(routes)
app.use(expense)
app.use(prefeature)
app.use(password)
app.use(premium)

const dotenv = require('dotenv');

dotenv.config();

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,`views/signup.html`))
})
// User.hasMany(Expense)
// Expense.belongsTo(User)
// User.hasMany(Order)
// Order.belongsTo(User)
// User.hasMany(Forgotpassword)
// Forgotpassword.belongsTo(User)
// User.hasMany(Report);
// Report.belongsTo(User);




// sequelize.sync().then(()=>{
// // console.log(result)
//     app.listen(3000)
// }).catch(err=>{
//     console.log(err)
// })
mongoose.connect('mongodb+srv://handagenalini:4zmH4mkGgrbtfyta@cluster0.bn0f0em.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000 , (req,res)=>{
        console.log('running')
    })
})
// mongoConnect(()=>{
//     app.listen(3000)
// })