// Note! This is in many ways copied verbatim from @mdn/yari

import readJsonDependency from '../../../read-json-dependency';

import featureRow from './feature-row';
import { headers, PLATFORM_BROWSERS } from './headers';

const bcd = readJsonDependency('@mdn/browser-compat-data', 'data.json');

function gatherPlatformsAndBrowsers(category, data) {
  const hasNodeJSData = data.__compat && 'nodejs' in data.__compat.support;
  const hasDenoData = data.__compat && 'deno' in data.__compat.support;

  let platforms = ['desktop', 'mobile'];
  if (category === 'javascript' || hasNodeJSData || hasDenoData) {
    platforms.push('server');
  } else if (category === 'webextensions') {
    platforms = ['webextensions-desktop', 'webextensions-mobile'];
  }

  const browsers = new Set(
    platforms.flatMap((platform) => PLATFORM_BROWSERS[platform] || []),
  );

  // If there is no Node.js data for a category outside of "javascript", don't
  // show it. It ended up in the browser list because there is data for Deno.
  if (category !== 'javascript' && !hasNodeJSData) {
    browsers.delete('nodejs');
  }

  return [platforms, Array.from(browsers)];
}

export function listFeatures(identifier, parentName = '', rootName = '') {
  const features = [];
  if (rootName && identifier.__compat) {
    features.push({
      name: rootName,
      compat: identifier.__compat,
      isRoot: true,
    });
  }

  for (const [subName, subIdentifier] of Object.entries(identifier)) {
    if (subName !== '__compat' && subIdentifier.__compat) {
      features.push(
        {
          name: parentName ? `${parentName}.${subName}` : subName,
          compat: subIdentifier.__compat,
          isRoot: parentName !== '',
        },
        ...listFeatures(subIdentifier, subName),
      );
    }
  }
  return features;
}

function featureListAccordion({ features, browsers }) {
  return features
    .map((feature, index) =>
      featureRow({
        feature,
        browsers,
        index,
      }),
    )
    .join('');
}

function compat(explicitQuery /* , depth = 1 */) {
  const { browserCompat: implicitQuery } = this.env;
  const query = explicitQuery || implicitQuery;

  if (!query) {
    throw new Error('No query provided');
  }
  if (typeof query !== 'string') {
    return query
      .map((q) =>
        compat.call({ ...this, env: { ...this.env, browserCompat: q } }),
      )
      .join('');
  }

  const { browsers: browserInfo } = bcd;
  let data = bcd;
  for (const current of query.split('.')) {
    data = data?.[current] || undefined;
  }

  if (data !== undefined) {
    const browserReleaseData = new Map();
    for (const [name, browser] of Object.entries(browserInfo)) {
      const releaseData = new Map();
      for (const [version, releaseInfo] of Object.entries(
        browser.releases || [],
      )) {
        if (releaseInfo) {
          releaseData.set(version, releaseInfo);
        }
      }
      browserReleaseData.set(name, releaseData);
    }

    for (const [key, compatData] of Object.entries(data)) {
      let block;
      if (key === '__compat') {
        block = compatData;
      } else if (compatData.__compat) {
        block = compatData.__compat;
      }
      if (block) {
        // eslint-disable-next-line prefer-const
        for (let [browserData, info] of Object.entries(block.support)) {
          // `info` here will be one of the following:
          //  - a single simple_support_statement:
          //    { version_added: 42 }
          //  - an array of simple_support_statements:
          //    [ { version_added: 42 }, { prefix: '-moz', version_added: 35 } ]
          //
          // Standardize the first version to an array of one, so we don't have
          // to deal with two different forms below
          if (!Array.isArray(info)) {
            info = [info];
          }
          for (const infoEntry of info) {
            const added = infoEntry.version_added;
            if (
              browserReleaseData.has(browserData) &&
              browserReleaseData.get(browserData).has(added)
            ) {
              infoEntry.release_date = browserReleaseData
                .get(browserData)
                .get(added).release_date;
            }
          }
        }
      }
    }

    const breadcrumbs = query.split('.');
    const category = breadcrumbs[0];
    const name = breadcrumbs[breadcrumbs.length - 1];

    const [platforms, browsers] = gatherPlatformsAndBrowsers(category, data);

    return `<div class="bc__table-wrapper">
        <table class="bc__table">
        ${headers({ platforms, browsers })}
          <tbody>
            ${featureListAccordion({
              browsers,
              features: listFeatures(data, '', name),
            })}
          </tbody>
        </table>
      </div>${
        '' // \<Legend compat={data} name={name} /\>
      }`.trim();
  }

  return `
    <div class="bcd__container">
      Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
    </div>`.trim();
}

export default compat;
