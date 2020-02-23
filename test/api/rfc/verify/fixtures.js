const {VALID_RFC} = require('./constants.json');

const rfcs = testUtils.generateFixtures({
  type: 'rfc',
  recipe: [
    {
      rfc: VALID_RFC,
      satMessage: 'ok',
      type: 'person',
      isValid: true,
      isRegistered: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
});

module.exports = {
  rfcs
};
