const Joi = require('joi');

const COMPANY = 'company';
const PERSON = 'person';

const schema = Joi.object().keys({
  context: Joi.object().keys({
    database: Joi.any().required()
  }).required(),
  body: Joi.object().keys({
    type: Joi.string().lowercase().trim().valid(COMPANY, PERSON).required(),
    name: Joi.string().uppercase().trim().required(),
    lastName1: Joi.string().uppercase().trim(),
    lastName2: Joi.string().uppercase().trim(),
    day: Joi.number().min(1).max(31).required(),
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().required()
  })
});

module.exports = schema;
