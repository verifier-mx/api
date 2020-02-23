const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errors = require('common-errors');
const endpoints = require('./endpoints');
const bindEndpoints = require('./bind-endpoints');
const bindResponses = require('./bind-responses');
const Middleware = require('../middleware');

const app = express();
const router = express.Router();

app.enable('trust proxy', true);
app.use(cors());
app.use(logger(':remote-addr :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errors.middleware.crashProtector());
app.use(bindResponses);

bindEndpoints(router, {
  endpoints,
  middleware: {
    preAction: [
      Middleware.addContext
    ]
  }
});

app.use(router);

// Handle not found error (Keep ALWAYS this route at the last position)
app.use((req, res) => {
  const {url, method} = req;
  const endpoint = `Endpoint: ${method} ${url}`;
  const error = new errors.NotFoundError(endpoint);
  res.sendError(error);
});

// Unhandled errors
app.use((error, req, res, next) => {
  console.error(error);
  const responseError = new errors.Error('Unknown server error :(');
  res.sendError(responseError);
});

module.exports = app;
