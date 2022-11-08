function htmlattrxref(attribute, elementName, termName, doNotWrapInCode) {
  const { targetLocale } = this.env;

  const lovercaseAttribute = attribute.toLowerCase();
  let content =
    termName && termName != undefined ? termName : lovercaseAttribute;

  const url = elementName
    ? `/${targetLocale}/docs/Web/HTML/Element/${elementName}`
    : `/${targetLocale}/docs/Web/HTML/Global_attributes`;

  if (!doNotWrapInCode) {
    content = `<code>${content}</code>`;
  }

  return `<a href="${url}#attr-${lovercaseAttribute}">${content}</a>`;
}

export default htmlattrxref;
