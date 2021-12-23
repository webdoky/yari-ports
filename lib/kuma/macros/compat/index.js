// Note! This is in many ways copied verbatim from @mdn/yari

const bcd = require('@mdn/browser-compat-data');
const { headers, PLATFORM_BROWSERS } = require('./headers');
const featureRow = require('./feature-row');

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
    platforms.map((platform) => PLATFORM_BROWSERS[platform] || []).flat()
  );

  // If there is no Node.js data for a category outside of "javascript", don't
  // show it. It ended up in the browser list because there is data for Deno.
  if (category !== 'javascript' && !hasNodeJSData) {
    browsers.delete('nodejs');
  }

  return [platforms, [...browsers]];
}

function listFeatures(identifier, parentName = '', rootName = '') {
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
      features.push({
        name: parentName ? `${parentName}.${subName}` : subName,
        compat: subIdentifier.__compat,
        isRoot: parentName !== '',
      });
      features.push(...listFeatures(subIdentifier, subName));
    }
  }
  return features;
}

function featureListAccordion({ features, browsers }) {
  return features
    .map((feature, i) =>
      featureRow({
        feature,
        browsers,
        index: i,
      })
    )
    .join('');
}

function compat(explicitQuery, depth = 1) {
  const { browserCompat: implicitQuery } = this;
  const query = explicitQuery || implicitQuery;

  if (!query) {
    throw new Error('No query provided');
  }

  const { browsers: browserInfo } = bcd;
  const data = query
    .split('.')
    .reduce((prev, curr) => (prev && prev[curr] ? prev[curr] : undefined), bcd);

  if (data !== undefined) {
    const browserReleaseData = new Map();
    for (const [name, browser] of Object.entries(browserInfo)) {
      const releaseData = new Map();
      for (const [version, data] of Object.entries(browser.releases || [])) {
        if (data) {
          releaseData.set(version, data);
        }
      }
      browserReleaseData.set(name, releaseData);
    }

    for (const [key, compat] of Object.entries(data)) {
      let block;
      if (key === '__compat') {
        block = compat;
      } else if (compat.__compat) {
        block = compat.__compat;
      }
      if (block) {
        for (let [browser, info] of Object.entries(block.support)) {
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
            if (browserReleaseData.has(browser)) {
              if (browserReleaseData.get(browser).has(added)) {
                infoEntry.release_date = browserReleaseData
                  .get(browser)
                  .get(added).release_date;
              }
            }
          }
        }
      }
    }

    const breadcrumbs = query.split('.');
    const category = breadcrumbs[0];
    const name = breadcrumbs[breadcrumbs.length - 1];

    const [platforms, browsers] = gatherPlatformsAndBrowsers(category, data);

    return `
      <table class="bc__table">
      ${headers({ platforms, browsers })}
        <tbody>
          ${featureListAccordion({
            browsers: browsers,
            features: listFeatures(data, '', name),
          })}
        </tbody>
      </table>
      ${
        '' // \<Legend compat={data} name={name} /\>
      }`.trim();
  }

  return `
    <div class="bcd__container">
      Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
    </div>`.trim();
}

module.exports.default = compat;
