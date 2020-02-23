const sinon = require('sinon');
const sendData = require(`${ROOT_PATH}/lib/server/responses/send-data`);

const statusMock = sinon.stub().returns();
const jsonpMock = sinon.stub().returns();
const expressResponse = {
  sendData,
  status: statusMock,
  jsonp: jsonpMock
};
expressResponse.res = expressResponse;

describe('Server | Responses | .sendData', () => {
  beforeEach(() => {
    statusMock.resetHistory();
    jsonpMock.resetHistory();
  });

  it('should respond json with 200 status on sucessful response', () => {
    const expectedStatus = 200;
    const data = 'DATA';

    expressResponse.sendData(data);

    expectResponse(expectedStatus, data);
  });
});

function expectResponse(expectedStatus, expectedData) {
  const [actualStatus] = statusMock.firstCall.args;
  expect(statusMock.callCount).to.be.equal(1);
  expect(actualStatus).to.be.equal(expectedStatus);

  const [actualData] = jsonpMock.firstCall.args;
  expect(jsonpMock.callCount).to.be.equal(1);
  expect(actualData).to.be.eql(expectedData);
}
