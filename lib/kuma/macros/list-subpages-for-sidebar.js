import DeprecatedBadge from './deprecated-badge';
import ExperimentalBadge from './experimental-badge';
import ListSubpagesForReference from './list-subpages-for-ref';
import NonStandardBadge from './non-standard-bage';
import ObsoleteBadge from './obsolete-badge';

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
  closeDelimiter,
) {
  const subpages = this.callMacro(
    ListSubpagesForReference(
      pathParameter,
      dontWrapAsCode,
      includeParentParameter,
      openDelimiter,
      closeDelimiter,
    ),
  );
  const BADGES = {
    experimental: this.callMacro(ExperimentalBadge),
    nonstandard: this.callMacro(NonStandardBadge),
    deprecated: this.callMacro(DeprecatedBadge),
    obsolete: this.callMacro(ObsoleteBadge),
  };
  const content = subpages.map(
    ({ badges, hasLocalizedContent, path, title }) => {
      return `<li${
        hasLocalizedContent ? '' : ' class="wd-nav-link--not-translated"'
      }>${badges
        .map((badgeName) => BADGES[badgeName])
        .join('')}<a href="${path}">${title}</a></li>`;
    },
  );
  if (content.length === 0) {
    return '';
  }
  return `<ol>${content}</ol>`;
}
