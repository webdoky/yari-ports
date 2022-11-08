function htmlElement(elementName, defaultLinkText, anchor = '') {
  const { targetLocale } = this.env;
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

export default htmlElement;
