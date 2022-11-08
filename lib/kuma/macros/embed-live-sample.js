// Note! This is in many ways copied verbatim from @mdn/yari
import safeDecodeURIComponent from '../utils/safe-decode-uri-component';
import slugify from '../utils/slugify';

import liveSampleUrl from './live-sample-url';

const MIN_HEIGHT = 60;
const sampleSpecificClassName = 'wd--live-sample';

// sampleId = $0 || $token.location.start.offset
function embedLiveSample(
  sampleId,
  width,
  heightParameter,
  screenshotUrl,
  sampleSlug,
  className = 'sample-code-frame',
  allowedFeatures,
) {
  let height = heightParameter;
  const { targetLocale } = this.env;
  const normalizedSampleId = sampleId.toLowerCase();
  const title = sampleId.replace(/_+/g, ' ');

  if (height && Number.parseInt(height, 10) < MIN_HEIGHT) {
    height = MIN_HEIGHT;
  }

  let sampleUrl = '';
  if (sampleSlug) {
    sampleUrl = `/${targetLocale}/docs`;
    sampleUrl += sampleSlug.startsWith('/') ? sampleSlug : `/${sampleSlug}`;
  }
  const url = this.callMacro(liveSampleUrl, normalizedSampleId, sampleUrl);

  // var hasScreenshot = screenshotUrl && screenshotUrl.length > 0;
  // if (hasScreenshot) {
  //   // TODO:
  // }
  return `<iframe class="${className} ${sampleSpecificClassName}" title="${title} sample" id="frame_${slugify(
    safeDecodeURIComponent(normalizedSampleId),
  )}" ${width ? ` width="${width}"` : ''} ${
    height ? ` height="${height}"` : ''
  } src="${url}" ${
    allowedFeatures ? `allow="${allowedFeatures}"` : ''
  }></iframe>`;
}

export default embedLiveSample;
