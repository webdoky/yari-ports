const supportedHeights = [
  'shorter',
  'taller',
  'tabbed-shorter',
  'tabbed-standard',
  'tabbed-taller',
];
const baseUrl = '/interactive-examples/';

function embedInteractiveExample(url, customHeightClass) {
  let heightClass = 'is-default-height';

  if (url.includes('/js/')) {
    heightClass = 'is-js-height';
  }

  if (customHeightClass) {
    let heightIsSupported = supportedHeights.includes(customHeightClass);

    if (heightIsSupported) {
      heightClass = `is-${customHeightClass}-height`;
    } else {
      throw new Error(
        `An unrecognized second size parameter to EmbedInteractiveExample ('${customHeightClass}')`
      );
    }
  }

  return `<h2>Спробуйте його в дії</h2>
<iframe class="interactive ${heightClass}" height="200" src="${baseUrl}${url}" title="ВебДоки - інтерактивний приклад"></iframe>`;
}

module.exports.default = embedInteractiveExample;
