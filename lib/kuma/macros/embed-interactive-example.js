const supportedHeights = new Set([
  'shorter',
  'taller',
  'tabbed-shorter',
  'tabbed-standard',
  'tabbed-taller',
]);
const baseUrl = '/interactive-examples/';
const exampleSpecificClassName = 'wd--interactive-example';

function embedInteractiveExample(url, customHeightClass) {
  let heightClass = 'is-default-height';

  if (url.includes('/js/')) {
    heightClass = 'is-js-height';
  }

  if (customHeightClass) {
    const heightIsSupported = supportedHeights.has(customHeightClass);

    if (heightIsSupported) {
      heightClass = `is-${customHeightClass}-height`;
    } else {
      throw new Error(
        `An unrecognized second size parameter to EmbedInteractiveExample ('${customHeightClass}')`,
      );
    }
  }

  return `<h2>Спробуйте його в дії</h2>
<iframe class="${exampleSpecificClassName} ${heightClass}" height="200" src="${baseUrl}${url}" title="ВебДоки - інтерактивний приклад"></iframe>`;
}

export default embedInteractiveExample;
