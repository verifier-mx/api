const {VALID_RFC} = require('./constants.json');

const [rfc] = testUtils.generateFixtures({
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

const blacklists69 = testUtils.generateFixtures({
  type: 'blacklist69',
  recipe: [
    {
      rfc: VALID_RFC,
      type: 'CANCELADOS',
      name: 'COMPANY NAME SA DE CV',
      firstPublicationDate: new Date(100),
      publicationDate: new Date(200),
      amount: 1000,
      state: 'JALISCO',
      reason: 'REASON 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined
    },
    {
      rfc: VALID_RFC,
      type: 'NO_LOCALIZADOS',
      name: 'COMPANY NAME, S.A. DE C.V.',
      firstPublicationDate: new Date(500),
      publicationDate: undefined,
      amount: 5012,
      state: 'JALISCO',
      reason: 'REASON 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined
    }
  ]
});

const [blacklist69b] = testUtils.generateFixtures({
  type: 'blacklist69b',
  recipe: [
    {
      rfc: VALID_RFC,
      blacklistId: '1234',
      name: 'COMPANY NAME, S.A. DE C.V.',
      status: 'favorable',
      allegedOgId: '500-05-2018-16632',
      allegedOgPublicationDate: new Date('2018-06-01T05:00:00.000Z'),
      allegedSatPublicationDate: new Date('2018-06-01T05:00:00.000Z'),
      allegedDofPublicationDate: new Date('2018-06-25T05:00:00.000Z'),
      detractedOgId: undefined,
      detractedOgPublicationDate: undefined,
      detractedSatPublicationDate: undefined,
      detractedDofPublicationDate: undefined,
      definitiveOgId: '500-05-2018-27105',
      definitiveOgPublicationDate: new Date('2018-09-27T05:00:00.000Z'),
      definitiveSatPublicationDate: new Date('2018-09-28T05:00:00.000Z'),
      definitiveDofPublicationDate: new Date('2018-10-23T05:00:00.000Z'),
      favorableOgId: '500-05-2019-7305',
      favorableOgPublicationDate: new Date('2019-03-05T06:00:00.000Z'),
      favorableSatPublicationDate: new Date('2019-03-05T06:00:00.000Z'),
      favorableDofPublicationDate: new Date('2019-04-16T05:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined
    }
  ]
});

module.exports = {
  rfc,
  blacklists69,
  blacklist69b
};
