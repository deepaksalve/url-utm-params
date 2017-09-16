const url = require('url');

const allowedUtms = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
];

const filterValidUtms = (utms) => {
  return Object.keys(utms)
    .filter(k => allowedUtms.includes(k))
    .reduce((o, k) => {
      o[k] = utms[k];
      return o;
    }, {});
};

exports.utm = (link, sep) => {
  const parsed = url.parse(unescape(link));
  const query = parsed.query || '';
  sep = sep || '&';
  const utmRegx = new RegExp('((utm_[^=]+)=([^\\' + sep + ']+))', 'gi');
  const matched = query.match(utmRegx) || [];
  return (matched.reduce((o, u) => {
    const kV = u.split('=');
    o[kV[0]] = kV[1];
    return o;
  }, {})) || {};
};

exports.strict = (link, sep) => {
  const utms = exports.utm(link, sep);
  return filterValidUtms(utms);
};

exports.build = (link, utms, isStrict) => {
  const parsed = url.parse(unescape(link));
  parsed.search = undefined;

  parsed.query = isStrict ? filterValidUtms(utms) : utms;

  return url.format(parsed);
};
