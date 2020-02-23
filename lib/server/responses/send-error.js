const {snakeCase} = require('lodash');
const {HttpStatusError} = require('common-errors');

const {
  message_map: HTTP_MESSAGE_MAP,
  code_map: HTTP_STATUS_MAP
} = HttpStatusError;

const DEFAULTS = {
  name: 'UnkownError',
  status: 500,
  message: 'Unknown server error'
};

function sendError(error) {
  const res = this.res;
  const name = (error || {}).name || DEFAULTS.name;

  const code = getCode(name);
  const status = HTTP_STATUS_MAP[name] || DEFAULTS.status;
  const message = error.message || HTTP_MESSAGE_MAP[name] || DEFAULTS.message;
  const responseBody = buildResponseBody(code, message);

  res.status(status);
  res.jsonp(responseBody);
}

function getCode(name) {
  return snakeCase(name).toUpperCase();
}

function buildResponseBody(code, message) {
  const error = {code, message};
  return {error};
}

module.exports = sendError;
