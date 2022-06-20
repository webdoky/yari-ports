// Note! This is in many ways copied verbatim from @mdn/yari
const {
  slugify,
  safeDecodeURIComponent,
} = require('@mdn/yari/kumascript/src/api/util');
const { default: liveSampleUrl } = require('./live-sample-url');

const MIN_HEIGHT = 60;
const sampleSpecificClassName = 'wd--live-sample';

// sampleId = $0 || $token.location.start.offset
function embedLiveSample(
  sampleId,
  width,
  height,
  screenshotUrl,
  sampleSlug,
  className = 'sample-code-frame',
  allowedFeatures
) {
  const { targetLocale } = this;
  const normalizedSampleId = sampleId.toLowerCase();
  const title = sampleId.replace(/[_]+/gm, ' ');

  if (height && parseInt(height) < MIN_HEIGHT) {
    height = MIN_HEIGHT;
  }

  let sampleUrl = '';
  if (sampleSlug) {
    sampleUrl = `/${targetLocale}/docs`;
    sampleUrl += sampleSlug.startsWith('/') ? sampleSlug : `/${sampleSlug}`;
  }
  var url = liveSampleUrl.call(this, normalizedSampleId, sampleUrl);

  // var hasScreenshot = screenshotUrl && screenshotUrl.length > 0;
  // if (hasScreenshot) {
  //   // TODO:
  // }
  return `<iframe class="${className} ${sampleSpecificClassName}" title="${title} sample" id="frame_${slugify(
    safeDecodeURIComponent(normalizedSampleId)
  )}" ${width ? ` width="${width}"` : ''} ${
    height ? ` height="${height}"` : ''
  } src="${url}" ${
    allowedFeatures ? `allow="${allowedFeatures}"` : ''
  }></iframe>`;
}

module.exports.default = embedLiveSample;
