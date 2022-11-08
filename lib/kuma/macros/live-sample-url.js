import safeDecodeURIComponent from '../utils/safe-decode-uri-component';
import slugify from '../utils/slugify';

function liveSampleUrl(sampleId, pagePath) {
  const { path } = this.env;
  const samplePath = `${pagePath || path}/_sample_.${slugify(
    safeDecodeURIComponent(sampleId),
  )}.html`;

  return samplePath;
}

export default liveSampleUrl;
