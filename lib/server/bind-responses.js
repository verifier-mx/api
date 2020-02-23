const {sendData, sendError} = require('./responses');

function bindResponses(req, res, next) {
  const responses = {
    sendData,
    sendError
  };

  Object.keys(responses).forEach(key => {
    const response = responses[key];
    res[key] = (function(req, res) {
      return response.bind({req, res});
    })(req, res);
  });

  next();
}

module.exports = bindResponses;
