const {get} = require('lodash');
const database = require('verifier-database');

const addContext = (req, res, next) => {
  const ip = getIp(req);
  const context = {
    database,
    ip
  };
  Object.assign(req, {context});
  return next();
};

const getIp = req => req.ip ? String(get(req, 'ip')) : null;

module.exports = addContext;
