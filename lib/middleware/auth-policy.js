const {getAuthKey, getAuthHeader} = require('../../config');
const {AuthenticationRequiredError} = require('common-errors');
const AUTH_HEADER = getAuthHeader();

const authPolicy = (req, res, next) => {
  const authKey = getAuthKey();
  const apiKey = req.headers[AUTH_HEADER];
  if (authKey !== apiKey) return res.sendError(new AuthenticationRequiredError('Invalid API key'));
  return next();
};

module.exports = authPolicy;
