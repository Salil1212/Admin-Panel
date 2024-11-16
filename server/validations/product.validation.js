const { Joi } = require('express-validation');

module.exports = {
    createProduct: {
        body:Joi.object(
            {
               productName:Joi.string.required(),
               price:Joi.number.required(),
            }
        )
    },
    
}

