const Joi = require('joi');

const createProductSchema = Joi.object({
  Name: Joi.string().min(3).max(100).required(),
  Price: Joi.number().positive().required(),
});

module.exports = { createProductSchema };
