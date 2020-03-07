const {pick, compact} = require('lodash');

const RFC_PROPERTIES = [
  'isValid', 'isRegistered', 'rfc', 'type', 'validationErrors'
];

const BLACKLIST69B_PROPERTIES = [
  'name', 'status'
];

const BLACKLIST69B_STATUSES = [
  'alleged', 'detracted', 'definitive', 'favorable'
];

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

module.exports = data => ({
  ...pick(data, RFC_PROPERTIES),
  blacklist69b: parseBlacklist69b(data.blacklist69b)
});
