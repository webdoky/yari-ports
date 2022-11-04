import DeprecatedBadge from './deprecated-badge.js';
import ExperimentalBadge from './experimental-badge.js';
import NonStandardBadge from './non-standard-badge.js';
import ObsoleteBadge from './obsolete-badge.js';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ';

/**
 * Prepares the title of the link. This includes wrapping the appropriate
 * portion of the title with <code>. Returns null if the page should not
 * be included in the index.
 *
 * @param {string} base
 * @returns {null | string}
 */
function buildTitle(base) {
  const spaceIndex = base.indexOf(' ');
  // If there are no spaces in the page's title, the entire base
  // string is the title, so we just wrap the whole thing in <code> and
  // return it.
  if (spaceIndex === -1 && base !== 'Reference') {
    return '<code>' + base + '</code>';
  }
  // If the character after the space is '(', then this is assumed to be an
  // interface with a qualifier after its name (such as "(Firefox OS)").
  // These are allowed to appear in the index, but we end the <code> block
  // before the first space
  if (spaceIndex < base.length - 1 && base[spaceIndex + 1] === '(') {
    return (
      '<code>' +
      base.substring(0, spaceIndex) +
      '</code>' +
      base.substring(spaceIndex)
    );
  }
  // It's not an interface, so return null.
  return null;
}

/**
 *
 * @param {string[]=} tagList
 * @param {string} tag
 * @returns {boolean}
 */
function containsTag(tagList, tag) {
  if (!tagList) return false;
  const normalizedTag = tag.toLowerCase();
  return tagList.some((tagItem) => tagItem.toLowerCase() === normalizedTag);
}
export default function ApiListAlpha(apiHref = '/uk/docs/Web/API') {
  const locale = this.env.targetLocale;
  const pages = this.registry.getChildren(apiHref); // get subpages, including tags
  // The result of `getChildren()` does not guarantee the order to be
  // alphabetical. Most of the time it is because of how the OS is iterating over
  // files on disk. So sort it first, because the rendering loop (see far below)
  // depends on it.
  pages.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase(), locale)
  );
  const numPages = pages.length;
  let html = '';
  const p = 0;
  for (const letter of letters) {
    const insertedHeading = false; // Haven't done this letter's heading yet
    if (p < numPages) {
      do {
        const tags = pages[p].tags;
        const url = pages[p].path;
        const title = pages[p].title;
        // Build the formatted title string; skip this page if it's not
        // an interface.
        const builtTitle = buildTitle(title);
        if (builtTitle === null) {
          p++;
          continue;
        }
        let badge = '';
        // add badges if needed
        if (
          containsTag(tags, 'Non-standard') ||
          containsTag(tags, 'Non standard')
        ) {
          badge += ` ${NonStandardBadge('1')}`;
        }
        if (containsTag(tags, 'Obsolete')) {
          badge += ` ${ObsoleteBadge(1)}`;
        } else if (containsTag(tags, 'Deprecated')) {
          badge += ` ${DeprecatedBadge(1)}`;
        }
        if (containsTag(tags, 'Experimental')) {
          badge += ` ${ExperimentalBadge('1')}`;
        }
        // Wrap the badges in another span
        if (badge.length > 0)
          badge = `<span class="indexListBadges">${badge}</span>`;
        if (title[0].toUpperCase() === letter) {
          if (!containsTag(tags, 'junk')) {
            if (!insertedHeading) {
              html += `<h3>${letter}</h3><ul>`;
              insertedHeading = true;
            }
            html += `\n<li><span class="indexListRow"><span class="indexListTerm"><a href="${url.replace(
              'en-US',
              locale
            )}">${builtTitle}</a></span>${badge}</span></li>`;
          }
          p++;
        } else {
          break;
        }
      } while (p < numPages);
    }
    html += '\n</ul>\n';
  }
  return `<div class="index">
    ${html}
  </div>`;
}
