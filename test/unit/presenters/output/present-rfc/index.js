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

const REMOVED_RFC_PROPERTIES = [
  'id', 'satMessage', 'createdAt', 'updatedAt'
];

const REMOVED_BL69B_PROPERTIES = [
  'rfc', 'blacklistId', 'createdAt', 'updatedAt', 'deletedAt'
];

describe('Presenters | Output | .presentRfc', () => {
  const {rfc, blacklists69, blacklist69b} = require('./fixtures');

  describe('RFC data', () => {
    const RFC = { ...rfc, blacklist69b: null };

    it('should return expeted properties on valid response', () => {
      const result = presentRfc(RFC);

      expect(result).to.be.eql({
        isValid: true,
        isRegistered: true,
        rfc: VALID_RFC,
        type: 'person',
        blacklist69: null,
        blacklist69b: null
      });
    });

    it('should return expcted properties on invalid response', () => {
      const result = presentRfc(INVALID_RESPONSE);
      expect(result).to.be.eql({
        isValid: false,
        isRegistered: false,
        rfc: null,
        type: null,
        blacklist69: null,
        blacklist69b: null,
        validationErrors: [ 'INVALID_DATE' ]
      });
    });

    describe('Remove non required properties', () => {
      const result = presentRfc(RFC);

      REMOVED_RFC_PROPERTIES.forEach(property => {
        it(`should remove property "${property}"`, () => {
          expect(result[property]).to.be.a('undefined');
        });
      });
    });
  });

  describe('Blacklist69 data', () => {
    const RFC = { ...rfc, blacklist69: blacklists69 };

    it('takes the longest company name available', () => {
      const result = presentRfc(RFC);
      expect(result.blacklist69.name).to.be.equal('COMPANY NAME, S.A. DE C.V.');
    });

    it('parses and selects common properties', () => {
      const result = presentRfc(RFC);
      const bl69 = result.blacklist69;
      expect(bl69.name).to.be.equal('COMPANY NAME, S.A. DE C.V.');
      expect(bl69.state).to.be.equal('JALISCO');
    });

    it('converts amount from cents to pesos', () => {
      const result = presentRfc(RFC);
      const amounts = result.blacklist69.lists.map(l => l.amount);
      expect(amounts).to.be.eql([10, 50.12]);
    });

    it('returns an array with all lists where the RFC is present', () => {
      const result = presentRfc(RFC);
      const bl69 = result.blacklist69;
      expect(bl69.lists).to.be.eql([
        {
          type: 'CANCELADOS',
          firstPublicationDate: new Date(100),
          publicationDate: new Date(200),
          amount: 10,
          reason: 'REASON 1'
        },
        {
          type: 'NO_LOCALIZADOS',
          firstPublicationDate: new Date(500),
          publicationDate: null,
          amount: 50.12,
          reason: 'REASON 2'
        }
      ]);
    });
  });

  describe('Blacklist69b data', () => {
    const RFC = { ...rfc, blacklist69b };

    it('parses and selects required properties', () => {
      const result = presentRfc(RFC);
      const bl69b = result.blacklist69b;
      expect(bl69b.id).to.be.equal('1234');
      expect(bl69b.name).to.be.equal('COMPANY NAME, S.A. DE C.V.');
      expect(bl69b.status).to.be.equal('favorable');
      expectBl69bDetails(bl69b.allegedDetails);
      expectBl69bDetails(bl69b.definitiveDetails);
      expectBl69bDetails(bl69b.favorableDetails);
    });

    it('returns details null for empty status', () => {
      const result = presentRfc(RFC);
      const bl69b = result.blacklist69b;
      expect(bl69b.detractedDetails).to.be.equal(null);
    });

    describe('Remove non required properties', () => {
      const result = presentRfc(RFC);

      REMOVED_BL69B_PROPERTIES.forEach(property => {
        it(`should remove property "${property}"`, () => {
          expect(result.blacklist69b[property]).to.be.a('undefined');
        });
      });
    });
  });
});

function expectBl69bDetails(details) {
  expect(details.ogId).to.be.a('string');
  expect(details.ogPublicationDate).to.be.a('date');
  expect(details.satPublicationDate).to.be.a('date');
  expect(details.dofPublicationDate).to.be.a('date');
}
