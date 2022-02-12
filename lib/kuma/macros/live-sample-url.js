const {
  slugify,
  safeDecodeURIComponent,
} = require('@mdn/yari/kumascript/src/api/util');

function liveSampleUrl(sampleId, pagePath) {
  const { path } = this;
  const samplePath = `${pagePath || path}/_sample_.${slugify(
    safeDecodeURIComponent(sampleId)
  )}.html`;

  return samplePath;
}

module.exports.default = liveSampleUrl;
