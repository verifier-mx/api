const request = require('supertest');
const {VALID_RFC, INVALID_RFC} = require('./constants.json');

const AUTH_HEADER = 'X-API-Key';
const API_KEY = 'test-api-key';

describe('API | POST /rfc/verify', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should successfully return a valid rfc', () => {
    const path = '/rfc/verify';
    const expectedCode = 200;

    return request(app)
      .post(path)
      .send({rfc: VALID_RFC})
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.rfc).to.be.equal(VALID_RFC);
        expect(body.isValid).to.be.equal(true);
      });
  });

  it('should successfully return an invalid rfc', () => {
    const path = '/rfc/verify';
    const expectedCode = 200;

    return request(app)
      .post(path)
      .send({rfc: INVALID_RFC})
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.rfc).to.be.equal(null);
        expect(body.isValid).to.be.equal(false);
        expect(body.validationErrors).to.be.be.an('array');
      });
  });

  it('should respond with unauthenticated error when not sending api key', () => {
    const path = '/rfc/verify';
    const expectedCode = 401;

    return request(app)
      .post(path)
      .send({rfc: VALID_RFC})
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');

        const {error} = body;
        expect(error).to.be.an('object');
        expect(error.code).to.be.equal('AUTHENTICATION_REQUIRED_ERROR');
        expect(error.message).to.be.equal('An attempt was made to perform an operation without authentication: Invalid API key');
      });
  });

  it('should respond with error when not sending an RFC', () => {
    const path = '/rfc/verify';
    const expectedCode = 400;

    return request(app)
      .post(path)
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');

        const {error} = body;
        expect(error).to.be.an('object');
        expect(error.code).to.be.equal('VALIDATION_ERROR');
        expect(error.message).to.be.equal('"body.rfc" is required');
      });
  });

  it('should respond with not found error when requesting a non existent endpoint', () => {
    const nonExistentPath = '/non-existent-endpoint';
    const expectedCode = 404;

    return request(app)
      .post(nonExistentPath)
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');

        const {error} = body;
        expect(error).to.be.an('object');
        expect(error.code).to.be.equal('NOT_FOUND_ERROR');
        expect(error.message).to.be.equal('Not Found: "Endpoint: POST /non-existent-endpoint"');
      });
  });
});
