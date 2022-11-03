function htmlattrxref(attribute, elementName, termName, doNotWrapInCode) {
  const { targetLocale } = this;

  const lowercaseAttribute = attribute.toLowerCase();
  let content = termName || lowercaseAttribute;

  const url = elementName
    ? `/${targetLocale}/docs/Web/HTML/Element/${elementName}`
    : `/${targetLocale}/docs/Web/HTML/Global_attributes`;

  if (!doNotWrapInCode) {
    content = `<code>${content}</code>`;
  }

  return `<a href="${url}#attr-${lowercaseAttribute}">${content}</a>`;
}

export default htmlattrxref;
