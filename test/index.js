process.env.NODE_ENV = 'test';
require('../config/load');

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {engines} = require('verifier-database');
const TestUtils = require('verifier-test-utils');
const app = require('../lib/server');

const ROOT_PATH = path.join(__dirname, '..');

global.app = app;
global.expect = chai.expect;
global.testUtils = new TestUtils({engines});
global.ROOT_PATH = ROOT_PATH;

chai.use(chaiAsPromised);

process.on('unhandledRejection', trace => console.log(trace));
