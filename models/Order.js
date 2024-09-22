const mongoose = require("mongoose")

const orderModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    cothSize: {
        type:"String",
        required: true,   
    },

    amount:{
        type: Number,
        required: true
    },

    currency:{
        type: String,
        default: 'INR',
    },
    
    // receipt: {
    //     type:String,
    // },

    status:{
        type: String,
        enum: ['Created', 'Delivered', 'Cancelled'],
        default: 'Created',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("Order", orderModel)
