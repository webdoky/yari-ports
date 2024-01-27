import htmlEscape from '../utils/html-escape';

/**
 * @typedef {Object} ListItem
 * @property {ListItem[]} children
 * @property {string} path
 * @property {string} slug
 * @property {string} title
 */

/**
 *
 * @param {ListItem[]} list
 * @param {number} depth
 * @param {number} reverse
 * @param {number} ordered
 * @returns
 */
function renderList(list, depth, reverse, ordered) {
  if (!list || list.length === 0 || depth < 1) {
    return '';
  }
  const targetList = reverse ? Array.from(list).reverse() : list;
  const listItems = targetList.map((item) => {
    const children = renderList(item.children, depth - 1, reverse, ordered);
    const listItem = `<li><a href="${item.path}">${htmlEscape(
      item.title,
    )}</a>${children}</li>`;
    return listItem;
  });
  const listTag = ordered ? 'ol' : 'ul';
  return `<${listTag}>${listItems.join('')}</${listTag}>`;
}

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
  depth = 1,
  reverse = 0,
  ordered = 0,
) {
  const {
    env: { path: implicitPath, targetLocale },
    registry,
  } = this;
  const targetPath = path || implicitPath;
  const targetSlug = targetPath.replace(`/${targetLocale}/docs/`, '');
  const children = registry.getChildren(targetSlug, true);
  const list = [];
  for (const child of children) {
    const listItem = {
      children: [],
      path: child.path,
      slug: child.slug,
      title: child.title,
    };
    const parentListItem = list.find((item) =>
      child.slug.startsWith(`${item.slug}/`),
    );
    if (parentListItem) {
      parentListItem.children.push(listItem);
    } else {
      list.push(listItem);
    }
  }
  return renderList(list, depth, reverse, ordered);
}
