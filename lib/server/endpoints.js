const HealthController = require('../controllers/health');
const RfcController = require('../controllers/rfc');
const Middleware = require('../middleware');

module.exports = {
  'GET /healthcheck': {
    middleware: [],
    action: HealthController.check
  },

  'POST /rfc/verify': {
    middleware: [Middleware.authPolicy],
    action: RfcController.verify
  },

  'POST /rfc/generate': {
    middleware: [Middleware.authPolicy],
    action: RfcController.generate
  }
};
