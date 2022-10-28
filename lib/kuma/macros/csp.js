const LANG = 'uk';

const CLOSING_LINK_TAG = '</a>';

/**
 *
 * @param {string} directiveSlug CSP directive URL slug
 * @param {string=} directiveName CSP directive name
 * @param {string=} anchor ID of a targeted element on a page of the CSP directive
 * @param {boolean=} isPlain Whether to drop wrapping the text with <code />
 * @returns {string} Link to content security policy directive page, HTML string
 */
export default function Csp(directiveSlug, directiveName, anchor, isPlain) {
  const url = `/${LANG}/docs/Web/HTTP/Headers/Content-Security-Policy/${directiveSlug}`;
  const openingLinkTag = `<a href="${url}${anchor ? `#${anchor}` : ''}">`;
  const openingCodeWrap = isPlain ? '' : '<code>';
  const closingCodeWrap = isPlain ? '' : '</code>';
  const textContent =
    `${directiveName}${anchor ? `.${anchor}` : ''}` || directiveSlug;
  return `${openingLinkTag}${openingCodeWrap}${textContent}${closingCodeWrap}${CLOSING_LINK_TAG}`;
}
