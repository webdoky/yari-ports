import safeDecodeURIComponent from '../utils/safe-decode-uri-component.js';
import slugify from '../utils/slugify.js';

function liveSampleUrl(sampleId, pagePath) {
  const { path } = this;
  const samplePath = `${pagePath || path}/_sample_.${slugify(
    safeDecodeURIComponent(sampleId)
  )}.html`;

  return samplePath;
}

export default liveSampleUrl;
