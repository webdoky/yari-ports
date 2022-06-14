// Note! This is in many ways copied verbatim from @mdn/yari

const { browserName } = require('./browser-name');

const PLATFORM_BROWSERS = {
  desktop: ['chrome', 'edge', 'firefox', 'ie', 'opera', 'safari'],
  mobile: [
    'webview_android',
    'chrome_android',
    'firefox_android',
    'opera_android',
    'safari_ios',
    'samsunginternet_android',
  ],
  server: ['deno', 'nodejs'],
  'webextensions-desktop': ['chrome', 'edge', 'firefox', 'opera', 'safari'],
  'webextensions-mobile': ['firefox_android', 'safari_ios'],
};

function platformHeaders({ platforms, browsers }) {
  return `<tr class="bc-platforms">
      <td></td>
      ${platforms
        .map((platform) => {
          // Get the intersection of browsers in the `browsers` array and the
          // `PLATFORM_BROWSERS[platform]`.
          const browsersInPlatform = PLATFORM_BROWSERS[platform].filter(
            (browser) => browsers.includes(browser)
          );
          const browserCount = Object.keys(browsersInPlatform).length;
          const platformId = platform.replace('webextensions-', '');
          return `<th class="bc-platform-${platformId}" colSpan="${browserCount}">
            <span>${platform}</span>
          </th>`;
        })
        .join('')}
    </tr>`.trim();
}

function browserHeaders({ browsers }) {
  return `<tr class="bc-browsers">
      <td></td>
      ${browsers
        .map(
          (browser) => `<th class="bc-browser-${browser}">
          <span class="bc-head-txt-label bc-head-icon-${browser}">
            ${browserName(browser)}
          </span>
        </th>`
        )
        .join('')}
    </tr>`.trim();
}

function headers({ platforms, browsers }) {
  return `<thead>
      ${platformHeaders({ platforms, browsers })}
      ${browserHeaders({ browsers })}
    </thead>`.trim();
}

module.exports = {
  headers,
  PLATFORM_BROWSERS,
};
