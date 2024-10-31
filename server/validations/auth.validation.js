const { Joi } = require('express-validation');

module.exports = {
    register1: {
        body:Joi.object(
            {
                firstName: Joi.string().required(), 
                lastName: Joi.string().required(), 
                email: Joi.string().required(),
                password: Joi.string().required(), 
                role: Joi.string().required()
            }
        )
    }
}

