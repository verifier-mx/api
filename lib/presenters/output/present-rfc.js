const {pick} = require('lodash');

const PICK_PROPERTIES = [
  'isValid', 'isRegistered', 'rfc', 'type', 'validationErrors'
];

module.exports = data => pick(data, PICK_PROPERTIES);
