const request = require('supertest');
const {COMPANY_RFC, PERSON_RFC} = require('./constants.json');

const AUTH_HEADER = 'X-API-Key';
const API_KEY = 'test-api-key';

const COMPANY_DATA = {
  type: 'company',
  name: 'RETWEETI',
  day: 5,
  month: 7,
  year: 2013
};

const PERSON_DATA = {
  type: 'person',
  name: 'Manuel Honorio',
  lastName1: 'de la Torre',
  lastName2: 'Ramírez',
  day: 10,
  month: 10,
  year: 1990
};

describe('API | POST /rfc/generate', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should successfully generate a company rfc', () => {
    const path = '/rfc/generate';
    const expectedCode = 200;

    return request(app)
      .post(path)
      .send(COMPANY_DATA)
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.rfc).to.be.equal(COMPANY_RFC);
        expect(body.isValid).to.be.equal(true);
      });
  });

  it('should successfully generate a person rfc', () => {
    const path = '/rfc/generate';
    const expectedCode = 200;

    return request(app)
      .post(path)
      .send(PERSON_DATA)
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.rfc).to.be.equal(PERSON_RFC);
        expect(body.isValid).to.be.equal(true);
      });
  });

  it('should send error when date is invalid', () => {
    const path = '/rfc/generate';
    const expectedCode = 400;

    return request(app)
      .post(path)
      .send({...PERSON_DATA, day: 45})
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.error).to.be.an('object');
        expect(body.error.code).to.be.equal('VALIDATION_ERROR');
      });
  });

  it('should send error sending an invalid type', () => {
    const path = '/rfc/generate';
    const expectedCode = 400;

    return request(app)
      .post(path)
      .send({...PERSON_DATA, type: 'invalid_type'})
      .set(AUTH_HEADER, API_KEY)
      .expect(expectedCode)
      .then(response => {
        const {body} = response;
        expect(body).to.be.an('object');
        expect(body.error).to.be.an('object');
        expect(body.error.code).to.be.equal('VALIDATION_ERROR');
      });
  });

  it('should respond with unauthenticated error when not sending api key', () => {
    const path = '/rfc/generate';
    const expectedCode = 401;

    return request(app)
      .post(path)
      .send(PERSON_DATA)
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
});
