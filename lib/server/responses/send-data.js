const SUCCESS_STATUS = 200;

function sendData(data) {
  const res = this.res;
  const status = SUCCESS_STATUS;

  res.status(status);
  res.jsonp(data);
}

module.exports = sendData;
