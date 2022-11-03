function htmlElement(elementName, defaultLinkText, anchor = '') {
  const { targetLocale } = this;
  const normalizedElementName = elementName.toString().toLowerCase();
  let linkText = defaultLinkText || normalizedElementName;

  const url = `/${targetLocale}/docs/Web/HTML/Element/${normalizedElementName}${anchor}`;

  if (
    linkText === normalizedElementName &&
    !normalizedElementName.includes(' ')
  ) {
    linkText = `<code>&lt;${linkText}&gt;</code>`;
  }

  return `<a href="${url}">${linkText}</a>`;
}

export default htmlElement;
