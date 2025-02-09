const { Joi } = require('express-validation');

module.exports = {
    register: {
        body:Joi.object(
            {
                firstName: Joi.string().required(), 
                lastName: Joi.string().required(), 
                email: Joi.string(),
                password: Joi.string().required().min(4).max(128),
                role: Joi.string().valid("User", "Admin"),
            }
        )
    },
    login: {
        body: Joi.object(
            {
                email: Joi.string(),
                password: Joi.string().required().min(3).max(128),
            }
        )
    }
}

