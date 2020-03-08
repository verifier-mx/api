const {SAT} = require('verifier-core');
const presentInput = require('./present-input');
const presentOutput = require('./present-output');
const schema = require('./schema');
const {validateSchema} = require('../../../presenters/utils');

function controller(req, res) {
  return validateSchema(req, schema)
    .then(execute)
    .then(res.sendData)
    .catch(res.sendError);
}

function execute(request) {
  return presentInput(request)
    .then(SAT.generateRfc)
    .then(data => presentOutput(data, request));
}

module.exports = controller;
