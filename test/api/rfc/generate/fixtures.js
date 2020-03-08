const {COMPANY_RFC, PERSON_RFC} = require('./constants.json');

const rfcs = testUtils.generateFixtures({
  type: 'rfc',
  recipe: [
    {
      rfc: COMPANY_RFC,
      satMessage: 'ok',
      type: 'company',
      isValid: true,
      isRegistered: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: PERSON_RFC,
      satMessage: 'ok',
      type: 'person',
      isValid: true,
      isRegistered: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
});

module.exports = { rfcs };
