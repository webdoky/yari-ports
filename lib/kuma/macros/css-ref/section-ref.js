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

  const groups = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Overview'),
  );
  const properties = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('CSS Property'),
  );
  const selectors = standardPages.filter(
    ({ data: { tags = [] } }) =>
      tags.includes('Selector') &&
      !tags.includes('Pseudo-element') &&
      !tags.includes('Pseudo-class'),
  );
  const pseudoClasses = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Pseudo-class'),
  );
  const pseudoElements = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Pseudo-element'),
  );
  const atRules = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('At-rule'),
  );
  const types = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('CSS Data Type'),
  );

  const pageToNavItem = ({ path, data: { title } }) => ({
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
      title: labels.Types,
      items: types.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: types.some(({ path }) => path === currentPath),
    },
  ];
}

export default referenceSections;
