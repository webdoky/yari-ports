function domxref(apiName, displayName, anchor = '', dontWrapInCode = false) {
  const { targetLocale } = this.env;

  let api = apiName;
  let content = `${displayName || apiName}${anchor ? `.${anchor}` : ''}`;
  api = api
    .replaceAll(' ', '_')
    .replaceAll('()', '')
    .replaceAll('.prototype.', '.')
    .replaceAll('.', '/');

  // Ensure Interfaces are always uppercased in links
  api = api.charAt(0).toUpperCase() + api.slice(1);

  const hash = anchor ? `#${anchor}` : '';

  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  const basePath = `/${targetLocale}/docs/Web/API/`;

  return `<a href="${basePath + api + hash}"${
    displayName ? ` title="${displayName}"` : ''
  }>${content}</a>`;
}

export default domxref;
