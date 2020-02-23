const Joi = require('joi');

const schema = Joi.object().keys({
  context: Joi.object().keys({
    database: Joi.any().required()
  }).required(),
  body: Joi.object().keys({
    rfc: Joi.string().lowercase().trim().required()
  })
});

module.exports = schema;
