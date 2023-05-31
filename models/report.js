// const Sequelize = require('sequelize');

// const sequelize= require('../utils/database');

// const Report= sequelize.define('report',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     fileUrl:Sequelize.STRING,
        
// })

// module.exports=Report;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reportSchema = new Schema ({
    fileUrl: String,
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = mongoose.model('report' , reportSchema)