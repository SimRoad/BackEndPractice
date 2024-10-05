const Joi = require('joi');

// Registration validation schema
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// Login validation schema
const loginSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(8).required(),
});

// Export the schemas
module.exports = {
    registerSchema,
    loginSchema,
};