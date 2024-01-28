/**
 * @typedef {Object} ListItem
 * @property {ListItem[]} children
 * @property {string} path
 * @property {string} slug
 * @property {string} title
 */

/**
 * Inserts a tree of subpages of the specified page.
 *
 * @param {string} path The path of the page whose subpages should be listed
 * @param {number} depth The depth of the tree to build; if not specified, only one level is listed
 * @param {number} reverse If specified and non-zero, the list is sorted in reverse
 * @param {number} ordered If specified and non-zero, the list is output as <ol> instead of the default <ul>
 * @returns {string}
 */
export default function ListSubPages(
  path,
  // depth = 1,
  // reverse = 0,
  // ordered = 0,
) {
  const {
    env: { path: implicitPath, targetLocale },
    registry,
  } = this;
  const targetPath = path || implicitPath;
  const targetSlug = targetPath.replace(`/${targetLocale}/docs/`, '');
  const rootPage = registry.getPageBySlug(targetSlug, true);
  const children = registry.getChildren(targetSlug, false);
  const list = [];
  for (const child of children) {
    const listItem = {
      // children: [],
      path: child.path,
      slug: child.slug,
      title: child.title,
    };
    // const parentListItem = list.find((item) =>
    //   child.slug.startsWith(`${item.slug}/`),
    // );
    // if (parentListItem) {
    //   parentListItem.children.push(listItem);
    // } else {
    list.push(listItem);
    // }
  }
  const pageToNavItem = ({ path: pagePath, slug, title }) => {
    return {
      hasLocalizedContent: registry.hasPage(slug, true),
      isCurrent: pagePath === implicitPath,
      path: pagePath,
      slug,
      title,
    };
  };
  return [
    {
      title: rootPage.title,
      links: list.map((item) => pageToNavItem(item)),
    },
  ];
}
