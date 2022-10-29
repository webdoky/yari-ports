/**
 *
 * @param {string} header
 * @param {string=} text
 * @param {string=} anchor
 * @param {boolean=} isTextPlain
 * @returns {string}
 */
export default function HttpHeader(header, text, anchor, isTextPlain) {
  const lang = this.env.targetLocale;
  let url = `/${lang}/docs/Web/HTTP/Headers/${header}`;
  const openingTag = `<a href="${url}${anchor ? `#${anchor}` : ''}">`;
  const openingWrapTag = isTextPlain ? '' : '<code>';
  const textContent = `${text || header}${anchor ? `.${anchor}` : ''}`;
  const closingWrapTag = isTextPlain ? '' : '</code>';
  return `${openingTag}${openingWrapTag}${textContent}${closingWrapTag}</a>`;
}
