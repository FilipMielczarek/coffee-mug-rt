const Joi = require('joi');

const createProductSchema = Joi.object({
  Name: Joi.string().min(3).max(100).required(),
  Price: Joi.number().positive().required(),
});

const updateProductSchema = Joi.object({
  Name: Joi.string().min(3).max(100),
  Price: Joi.number().positive(),
});

module.exports = { createProductSchema, updateProductSchema };
