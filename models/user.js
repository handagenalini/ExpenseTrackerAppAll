
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// //id, name , password, phone number, role

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: {
//        type:  Sequelize.STRING,
//        allowNull: false,
//        unique: true
//     },
//     password: Sequelize.STRING,
//     ispremiumuser:Sequelize.BOOLEAN,
//     Totalexpense:{
//         type:Sequelize.INTEGER,
//         default:0
//     }
// })

// module.exports=User;
const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const Schema = mongoose.Schema ;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    
ispremiumuser :{
        type : Boolean,
        default:false
    },
    Totalexpense:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('User' , userSchema)
