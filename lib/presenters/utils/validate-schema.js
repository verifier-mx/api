const Joi = require('joi');
const {ValidationError} = require('common-errors');

const DEFAULT_OPTIONS = {
  convert: true,
  allowUnknown: true,
  stripUnknown: true,
  presence: 'optional'
};

function validateSchema(input, schema, opts = {}) {
  const options = { ...DEFAULT_OPTIONS, ...opts };
  const {error, value} = Joi.validate(input, schema, options);

  if (!error) return Promise.resolve({ ...value });

  const message = error.details
    .map(d => d.message)
    .join(',');

  return Promise.reject(new ValidationError(message));
}

module.exports = validateSchema;
