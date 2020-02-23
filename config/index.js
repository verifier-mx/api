const {get} = require('lodash');
const {env} = process;

module.exports = {
  getEnvironment: () => get(env, 'NODE_ENV'),

  getApiConfig: () => ({
    host: get(env, 'API_HOST'),
    port: get(env, 'API_PORT')
  }),

  getAuthKey: () => get(env, 'AUTH_KEY'),

  getAuthHeader: () => get(env, 'AUTH_HEADER')
};
