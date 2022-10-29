// Note! This is in many ways copied verbatim from @mdn/yari
import liveSampleUrl from './live-sample-url.js';
import safeDecodeURIComponent from '../utils/safe-decode-uri-component.js';
import slugify from '../utils/slugify.js';

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
  const { targetLocale } = this.env;
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
  var url = this.callMacro(liveSampleUrl, normalizedSampleId, sampleUrl);

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

export default embedLiveSample;
