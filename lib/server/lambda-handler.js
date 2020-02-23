require('../../config/load');
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');

const server = awsServerlessExpress.createServer(app);

module.exports.server = (event, context) => { awsServerlessExpress.proxy(server, event, context); };
