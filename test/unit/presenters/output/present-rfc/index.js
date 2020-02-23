const presentRfc = require(`${ROOT_PATH}/lib/presenters/output/present-rfc`);
const {VALID_RFC} = require('./constants.json');

const INVALID_RESPONSE = {
  isValid: false,
  isRegistered: false,
  rfc: null,
  type: null,
  satMessage: null,
  validationErrors: [ 'INVALID_DATE' ]
};

const REMOVED_PROPERTIES = [
  'id', 'satMessage', 'createdAt', 'updatedAt'
];

describe('Presenters | Output | .presentRfc', () => {
  const {rfcs: [RFC]} = require('./fixtures');

  it('should return expeted properties on valid response', () => {
    const result = presentRfc(RFC);
    expect(result).to.be.eql({
      isValid: true,
      isRegistered: true,
      rfc: VALID_RFC,
      type: 'person'
    });
  });

  it('should return expcted properties on invalid response', () => {
    const result = presentRfc(INVALID_RESPONSE);
    expect(result).to.be.eql({
      isValid: false,
      isRegistered: false,
      rfc: null,
      type: null,
      validationErrors: [ 'INVALID_DATE' ]
    });
  });

  describe('Remove non required properties', () => {
    const result = presentRfc(RFC);

    REMOVED_PROPERTIES.forEach(property => {
      it(`should remove property "${property}"`, () => {
        expect(result[property]).to.be.a('undefined');
      });
    });
  });
});
