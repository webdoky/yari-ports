import labels from './labels';

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

function referenceSections() {
  const {
    env: { path: currentPath },
    registry,
  } = this;
  const cssPages = Array.from(registry.getPagesData()).filter(
    ({ section }) => section === 'css',
  );

  const standardPages = cssPages.filter(
    ({ data: { tags = [] } }) => !tags.includes('Non-standard'),
  );

  const groups = [];
  const properties = [];
  const selectors = [];
  const combinators = [];
  const pseudoClasses = [];
  const pseudoElements = [];
  const atRules = [];
  const functions = [];
  const types = [];

  for (const page of standardPages) {
    switch (page.pageType) {
      case 'css-module': {
        groups.push(page);
        break;
      }
      case 'css-shorthand-property':
      case 'css-property': {
        properties.push(page);
        break;
      }
      case 'css-selector': {
        selectors.push(page);
        break;
      }
      case 'css-combinator': {
        combinators.push(page);
        break;
      }
      case 'css-pseudo-class': {
        pseudoClasses.push(page);
        break;
      }
      case 'css-pseudo-element': {
        pseudoElements.push(page);
        break;
      }
      case 'css-at-rule': {
        atRules.push(page);
        break;
      }
      case 'css-function': {
        functions.push(page);
        break;
      }
      case 'css-type': {
        types.push(page);
        break;
      }
      default:
    }
  }

  const pageToNavItem = ({ path, title }) => ({
    title,
    path,
    isCurrent: path === currentPath,
  });

  return [
    {
      title: labels.Modules,
      items: groups.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: groups.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Properties,
      items: properties.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: properties.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Selectors,
      items: selectors.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: selectors.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Combinators,
      items: combinators.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: combinators.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Pseudo-classes'],
      items: pseudoClasses.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: pseudoClasses.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Pseudo-elements'],
      items: pseudoElements
        .map((item) => pageToNavItem(item))
        .sort(sortByTitle),
      expanded: pseudoElements.some(({ path }) => path === currentPath),
    },
    {
      title: labels['At-rules'],
      items: atRules.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: atRules.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Functions,
      items: functions.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: functions.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Types,
      items: types.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: types.some(({ path }) => path === currentPath),
    },
  ];
}

export default referenceSections;
