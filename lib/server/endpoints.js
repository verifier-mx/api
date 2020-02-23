const RfcController = require('../controllers/rfc');
const Middleware = require('../middleware');

module.exports = {
  'POST /rfc/verify': {
    middleware: [Middleware.authPolicy],
    action: RfcController.verify
  }
};
