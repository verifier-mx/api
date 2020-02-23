const sinon = require('sinon');
const {NotFoundError} = require('common-errors');
const sendError = require(`${ROOT_PATH}/lib/server/responses/send-error`);

const statusMock = sinon.stub().returns();
const jsonpMock = sinon.stub().returns();
const expressResponse = {
  sendError,
  status: statusMock,
  jsonp: jsonpMock
};
expressResponse.res = expressResponse;

describe('Server | Responses | .sendError', () => {
  beforeEach(() => {
    statusMock.resetHistory();
    jsonpMock.resetHistory();
  });

  it('should respond json with code and default message for a known error', () => {
    const expectedStatus = 404;
    const expectedData = {
      error: {
        message: 'Not Found: \"undefined\"',
        code: 'NOT_FOUND_ERROR'
      }
    };

    expressResponse.sendError(new NotFoundError());

    expectResponse(expectedStatus, expectedData);
  });

  it('should respond json with code and custom message for a known error', () => {
    const expectedStatus = 404;
    const message = 'This is a custom message';
    const expectedData = {
      error: {
        message: `Not Found: "${message}"`,
        code: 'NOT_FOUND_ERROR'
      }
    };

    expressResponse.sendError(new NotFoundError(message));

    expectResponse(expectedStatus, expectedData);
  });

  it('should respond json with default code and message for an unknown error', () => {
    const expectedStatus = 500;
    const expectedData = {
      error: {
        message: 'Unknown server error',
        code: 'ERROR'
      }
    };

    expressResponse.sendError(new Error());

    expectResponse(expectedStatus, expectedData);
  });

  it('should respond json with default code and custom message for an unknown error', () => {
    const expectedStatus = 500;
    const message = 'This is a custom message';
    const expectedData = {
      error: {
        message,
        code: 'ERROR'
      }
    };

    expressResponse.sendError(new Error(message));

    expectResponse(expectedStatus, expectedData);
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
