// Note! This is in many ways copied verbatim from @mdn/yari
const bcd = require('@mdn/browser-compat-data');

function browserName(id) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }

  return browserInfo[id].name;
}

function browserPreviewName(id) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }
  return browserInfo[id].preview_name;
}

module.exports = {
  browserName,
  browserPreviewName,
};
