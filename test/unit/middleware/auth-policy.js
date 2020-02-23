const proxyquire = require('proxyquire');

const AUTH_HEADER = 'x-api-key';
const AUTH_KEY = 'MY_API_KEY';
const INVALID_API_KEY = 'INVALID_API_KEY';

const fakeConfig = {
  getAuthHeader: () => AUTH_HEADER,
  getAuthKey: () => AUTH_KEY
};

const authPolicy = proxyquire(`${ROOT_PATH}/lib/middleware/auth-policy`, {
  '../../config': fakeConfig
});

describe('Middleware | AuthPolicy', () => {
  it('should pass to next step if api key is ok', (done) => {
    const fakeRequest = {
      headers: {
        [AUTH_HEADER]: AUTH_KEY
      }
    };

    const fakeResponse = {};

    authPolicy(fakeRequest, fakeResponse, done);
  });

  it('should send unauthorized error when sending invalid api key', (done) => {
    const fakeRequest = {
      headers: {
        [AUTH_HEADER]: INVALID_API_KEY
      }
    };

    const fakeResponse = {
      sendError: (error) => {
        expect(error.name).to.be.equal('AuthenticationRequiredError');
        done();
      }
    };

    authPolicy(fakeRequest, fakeResponse, () => {
      done(new Error('Should not pass to next step'));
    });
  });
});
