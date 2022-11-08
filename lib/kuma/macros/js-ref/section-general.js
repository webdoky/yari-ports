const pageToNavItem = ({ path, data: { title } }) => ({
  title,
  path,
});

function generalLinks(objectName) {
  const {
    registry,
    // env: { path: currentPagePath },
  } = this;
  const pages = Array.from(registry.getPagesData());

  const generalPages = [
    pages.find(
      ({ data: { slug } }) =>
        slug === 'Web/JavaScript/Reference/Global_Objects',
    ),
    pages.find(
      ({ data: { slug } }) =>
        slug === `Web/JavaScript/Reference/Global_Objects/${objectName}`,
    ),
  ].filter(Boolean);

  return [
    {
      items: generalPages.map((item) => pageToNavItem(item)),
      expanded: true,
    },
  ];
}

export default generalLinks;
