import htmlEscape from '../utils/html-escape';

import DeprecatedBadge from './deprecated-badge';
import ExperimentalBadge from './experimental-badge';
import NonStandardBadge from './non-standard-bage';
import ObsoleteBadge from './obsolete-badge';

const overview = 'Огляд';

/**
 * Inserts a tree of subpages of the specified page to be used in the sidebar (quicklinks)
 * Displays common flags/icons
 * Includes the parent page at the top of the list.
 * If the path ends with a slash, remove it.
 *
 * @param {string} pathParam The path of the page whose subpages should be listed.
 * @param {boolean=} dontWrapAsCode
 * @param {boolean=} includeParentParameter
 * @param {string=} openDelimiter only text after (including) this in the title will be used
 * @param {string=} closeDelimiter only text before (including) this is used
 * @returns {string}
 *
 * @example {{ListSubpagesForSidebar("/en-US/docs/Web/API/WebRTC_API", 1)}}
 * @example {{ListSubpagesForSidebar("/en-US/docs/Web/HTML/Element", 0, 0, "<", ">")}}
 */
export default function ListSubpagesForSidebar(
  pathParameter,
  dontWrapAsCode = false,
  includeParentParameter = false,
  openDelimiter,
  closeDelimiter
) {
  const {
    env: { tags, targetLocale },
    registry,
  } = this;
  const path = pathParameter.replace(/\/$/, '');
  const wrapInCode = !dontWrapAsCode;
  const includeParent = !!includeParentParameter;
  const parent = registry.getPageBySlug(path);
  const pages = registry.getChildren(path);

  // Trims the title, returning only the text
  // between the start and end delimiter characters.
  // Does nothing if both are null or empty.
  function trimTitle(title) {
    const startIndex = openDelimiter
      ? Math.max(title.indexOf(openDelimiter), 0)
      : 0;
    // if endIndex is 0 (not found), then use title.length
    const endIndex =
      (closeDelimiter ? title.indexOf(closeDelimiter) + 1 : title.length) ||
      title.length + 0;
    // eslint-disable-next-line unicorn/prefer-string-slice
    return title.substring(startIndex, endIndex);
  }
  // Trim english title for sorting.
  for (const page of pages) {
    page.title = trimTitle(page.title);
  }
  // sorted by english title for subpages
  pages.sort((a, b) => a.title.localeCompare(b.title));
  // always keep the parent page on top, so insert it after sorting
  if (includeParent) {
    pages.unshift({
      ...parent,
      title: overview,
    });
  }
  function containsTag(tagName) {
    const tagNameLowercase = tagName.toLowerCase();
    return tags.some((tagItem) => tagItem.toLowerCase() === tagNameLowercase);
  }
  const badges = {
    ExperimentalBadge: this.callMacro(ExperimentalBadge),
    NonStandardBadge: this.callMacro(NonStandardBadge),
    DeprecatedBadge: this.callMacro(DeprecatedBadge),
    ObsoleteBadge: this.callMacro(ObsoleteBadge),
  };
  function createLink(item) {
    const url = item.url.replace('en-US', targetLocale);
    let title = htmlEscape(item.title);
    if (targetLocale !== 'en-US') {
      for (const translation of item.translations) {
        if (translation.locale === targetLocale) {
          title = htmlEscape(trimTitle(translation.title));
        }
      }
    }
    const pageBadges = [];
    if (containsTag(item, 'Experimental')) {
      pageBadges.push(badges.ExperimentalBadge);
    }
    if (
      containsTag(item, 'Non-standard') ||
      containsTag(item, 'Non Standard')
    ) {
      pageBadges.push(badges.NonStandardBadge);
    }
    if (containsTag(item, 'Deprecated')) {
      pageBadges.push(badges.DeprecatedBadge);
    }
    if (containsTag(item, 'Obsolete')) {
      pageBadges.push(badges.ObsoleteBadge);
    }
    let linkContent = title;
    if (wrapInCode) {
      linkContent = `<code>${linkContent}</code>`;
    }
    const result = `<li>${pageBadges.join(
      ''
    )}<a href="${url}">${linkContent}</a></li>`;
    return result;
  }
  const output =
    pages.length > 0
      ? `<ol>${pages.map((page) => createLink(page)).join('')}</ol>`
      : '';
  return output;
}
