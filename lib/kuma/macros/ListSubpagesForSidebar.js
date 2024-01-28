function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

export default function ListSubpagesForSidebar(rootPath) {
  const {
    env: { currentPath, targetLocale },
    registry,
  } = this;
  const rootSlug = rootPath.replace(`/${targetLocale}/docs/`, '');
  const rootPage = registry.getPageBySlug(rootSlug, false);
  if (!rootPage) {
    throw new Error(`Page not found: ${rootSlug}`);
  }
  const children = registry.getChildren(rootPage.slug, false);
  const pageToNavItem = ({ slug, path, title }) => ({
    hasLocalizedContent: registry.hasPage(slug, true),
    isCurrent: path === currentPath,
    path,
    title,
  });
  const links = children.map((childItem) => pageToNavItem(childItem));
  links.sort(sortByTitle);
  return [
    {
      title: rootPage.title,
      links,
    },
  ];
}
