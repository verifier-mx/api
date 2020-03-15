const {pick, compact, isFinite} = require('lodash');

const RFC_PROPERTIES = [
  'isValid', 'isRegistered', 'rfc', 'type', 'validationErrors'
];

const BLACKLIST69B_PROPERTIES = [
  'name', 'status'
];

const BLACKLIST69B_STATUSES = [
  'alleged', 'detracted', 'definitive', 'favorable'
];

const parseBlacklist69 = (data) => {
  if (!data || !data.length) return null;

  const info = data.reduce((prev, item) => {
    if (!prev.name || length(item.name) > length(prev.name)) prev.name = item.name;
    if (!prev.state || length(item.state) > length(prev.state)) prev.state = item.state;
    return prev;
  }, {});

  return {
    ...info,
    lists: getBlacklist69Lists(data)
  };
};

const getBlacklist69Lists = (data) => {
  return data.map(({type, firstPublicationDate, publicationDate, amount, reason}) => ({
    type,
    firstPublicationDate: firstPublicationDate || null,
    publicationDate: publicationDate || null,
    amount: centsToUnits(parseFloat(amount)),
    reason: reason || null
  }));
};

const parseBlacklist69b = (data) => {
  if (!data) return null;

  const response = {
    id: data.blacklistId,
    ...pick(data, BLACKLIST69B_PROPERTIES)
  };

  return BLACKLIST69B_STATUSES.reduce((response, status) => {
    return Object.assign(response, { [`${status}Details`]: parseBlacklist69bStatus(status, data) });
  }, response);
};

const parseBlacklist69bStatus = (status, data = {}) => {
  const response = {
    ogId: data[`${status}OgId`] || null,
    ogPublicationDate: data[`${status}OgPublicationDate`] || null,
    satPublicationDate: data[`${status}SatPublicationDate`] || null,
    dofPublicationDate: data[`${status}DofPublicationDate`] || null
  };
  const hasData = !!compact(Object.values(response)).length;
  return hasData ? response : null;
};

const length = str => (str || '').length;

const centsToUnits = cents => isFinite(cents) ? cents / 100 : null;

module.exports = data => ({
  ...pick(data, RFC_PROPERTIES),
  blacklist69: parseBlacklist69(data.blacklist69),
  blacklist69b: parseBlacklist69b(data.blacklist69b)
});
