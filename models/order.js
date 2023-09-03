const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//id, name , password, phone number, role

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = Order;
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const orderSchema = new Schema ({
//     paymentid: String,
//     orderid: String,
//     // signature: String,
//     status: String,
//     userId:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:'User'
//     }
// })

// module.exports = mongoose.model('Order' , orderSchema)