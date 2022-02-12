function htmlElement(elementName, defaultLinkText, anchor = '') {
  const { targetLocale } = this;
  let normalizedElementName = elementName.toString().toLowerCase();
  let linkText = defaultLinkText || normalizedElementName;

  let url = `/${targetLocale}/docs/Web/HTML/Element/${normalizedElementName}${anchor}`;

  if (
    linkText === normalizedElementName &&
    normalizedElementName.indexOf(' ') === -1
  ) {
    linkText = `<code>&lt;${linkText}&gt;</code>`;
  }

  return `<a href="${url}">${linkText}</a>`;
}

module.exports.default = htmlElement;
