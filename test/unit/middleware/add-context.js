const proxyquire = require('proxyquire');

const FAKE_DATABASE = {db: 'DATABASE'};

const addContext = proxyquire(`${ROOT_PATH}/lib/middleware/add-context`, {
  'verifier-database': FAKE_DATABASE
});

describe('Middleware | AddContext', () => {
  it('should add context object', (done) => {
    const fakeRequest = {};

    const fakeResponse = {};

    addContext(fakeRequest, fakeResponse, () => {
      const {context} = fakeRequest;
      expect(context).to.be.an('object');
      done();
    });
  });

  it('should include a database object in the context', (done) => {
    const fakeRequest = {};

    const fakeResponse = {};

    addContext(fakeRequest, fakeResponse, () => {
      const {context} = fakeRequest;
      expect(context.database).to.be.eql(FAKE_DATABASE);
      done();
    });
  });

  describe('Add ip to context', () => {
    it('should return ip located in request', (done) => {
      const ip = '127.0.0.1';
      const fakeRequest = { ip };

      const fakeResponse = {};

      addContext(fakeRequest, fakeResponse, () => {
        const {context} = fakeRequest;
        expect(context.ip).to.be.eql(ip);
        done();
      });
    });

    it('should return null when ip is not present', (done) => {
      const fakeRequest = {};

      const fakeResponse = {};

      addContext(fakeRequest, fakeResponse, () => {
        const {context} = fakeRequest;
        expect(context.ip).to.be.eql(null);
        done();
      });
    });
  });
});
