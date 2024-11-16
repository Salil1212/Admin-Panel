const { default: Stripe } = require('stripe');
const PaymentGateways = require('../models/PaymentGateways')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const paypal = require("paypal-rest-sdk")

// Configure PayPal with credentials
paypal.configure({
    mode: "sandbox",
    client_id:process.env.PAYPAL_CLIENT_ID,
    client_secret:process.env.PAYPAL_CLIENT_SECRET,
})

exports.paymentOption = async (req,res, next) => {
    try{
        const options = await PaymentGateways.find(
            {
                active: 1
            },
            'id name currency'
        );
        res.json({payment_options: options});
    }
    catch(error){
        next(error);
    }
}

exports.postPaymentOption = async(req,res, next) => {
    const {name,currency,type,active} = req.body
    try{
        const payment = await PaymentGateways.findOne({name});
        if(payment) return res.status(400).json({message: "Payment already exists"});
        const newPayment = new PaymentGateways({
            name,
            currency,
            type,
            active
        });
        await newPayment.save();
        res.status(201).json({message: "Payment registered successfully"});
    }
    catch(error){
        next(error);
    }
}

exports.prePayment = async(req,res,next) => {
  const {gateway, amount, currency} = req.body;

  try{
    if (gateway === "Stripe"){
        // Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
        });

        res.json({
            success: true,
            gateway: "Stripe",
            clientSecret: paymentIntent.client_secret,
        })
    }
    else if(gateway === "PayPal"){
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            transactions: [
                {
                    amount: {
                        currency: currency,
                        total: amount.toString(),
                    },
                    description: "Payment through PayPal",
                }
            ],
            redirect_urls: {
                return_url: "http://localhost:3000/api/payment/paypal/success",
                cancel_url: "http://localhost:3000/api/payment/paypal/cancel",
            },

        };
        paypal.payment.create(create_payment_json,(error,payment) => {
            if(error) {
                res.status(500).json({success: false, error: error.response});
            }
            else{
                const approvalUrl = payment.links.find(
                    (link) => link.rel === "approval_url"
                ).href;
                res.json({
                    success: true,
                    gateway: "PayPal",
                    approvalUrl: approvalUrl,
                })
            }
        });
    }
    else{
        res.status(400).json({success: false, message: "Invalid payment gateway"})
    }

  } catch(error){
    res.status(500).json({success:false,error: error.message});
  }
}
