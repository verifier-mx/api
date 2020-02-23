const METHODS_MAPPING = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  ALL: 'all'
};

const parseMethod = (input) => {
  const parsedInput = (input || '').trim().toUpperCase();
  return METHODS_MAPPING[parsedInput];
};

/**
 * Attaches endpoints to a Express router
 * @param {*} router - Express router
 * @param {Object} config - Router configuration
 * @param {Object} config.endpoints - Endpoints list and configuration
 * @param {Object} config.middleware - Middleware to be used in the endpoint.
 * @param {*[]} config.middleware.preAction - Array of middle functions to be executed before the action occurs
 */

const bindEndpoints = (router, config) => {
  const {endpoints, middleware: configMiddleware = []} = config;

  Object.keys(endpoints).forEach(endpoint => {
    const route = endpoints[endpoint];
    const parsedEdnpoint = endpoint.trim().replace(/\s{2,}/g, ' ');
    const [methodRaw, path] = parsedEdnpoint.split(' ');
    const method = parseMethod(methodRaw);

    if (!method) throw new Error(`Route method "${methodRaw}" for endpoint "${parsedEdnpoint}" is invalid. Use one of "${Object.keys(METHODS_MAPPING).join(', ')}".`);
    if (!path) throw new Error(`No path found for endpoint "${parsedEdnpoint}".`);

    const {middleware, action} = route;
    const preActionMiddleware = configMiddleware.preAction || [];
    router[method](path, middleware, preActionMiddleware, action);
  });
};

module.exports = bindEndpoints;
