function domxref(apiName, displayName, anchor = '', dontWrapInCode = false) {
  const { targetLocale } = this;

  let api = apiName;
  let content = `${displayName || apiName}${anchor ? '.' + anchor : ''}`;
  api = api
    .replace(/ /g, '_')
    .replace(/\(\)/g, '')
    .replace(/\.prototype\./g, '.')
    .replace(/\./g, '/');

  // Ensure Interfaces are always uppercased in links
  api = api.charAt(0).toUpperCase() + api.slice(1);

  let hash = anchor ? '#' + anchor : '';

  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  const basePath = `/${targetLocale}/docs/Web/API/`;

  return `<a href="${basePath + api + hash}"${
    displayName ? ` title="${displayName}"` : ''
  }>${content}</a>`;
}

export default domxref;
