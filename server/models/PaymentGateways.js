const mongoose =require("mongoose")
const jwt =require("jsonwebtoken")

const PaymentGatewaysSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required:true,
            unqiue: true
        
        },
        currency: {
            type: String,
            required: true,
        },
        type: {
       type: String,
       required: true,

        },
        active: {
           type: Boolean,
           required: true,
        },

    },
    { timestamps: true }

)

module.exports = mongoose.model("PaymentGateways",PaymentGatewaysSchema);