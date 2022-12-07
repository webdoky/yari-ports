const initialSlug = 'Global_Objects';
const referenceContentSections = new Set([
  'about',
  'classes',
  'deprecated_and_obsolete_features',
  'errors',
  'functions',
  'global_objects',
  'iteration_protocols',
  'lexical_grammar',
  'operators',
  'statements',
  'strict_mode',
  'template_literals',
  'trailing_commas',
]);

/**
 * Inserts a link to a JS API's documentation in the JS Reference.
 *
 * @param {string} termName API name
 * @param {string=} displayName name to display (optional)
 * @param {string=} anchor anchor (#xyz) (optional)
 * @param {boolean} dontWrapInCode If set, do not put the text in <code></code>
 * @returns {string}
 *
 * @example {{jsxref("Date")}}
 * @example {{jsxref("Date.prototype.toString()")}}
 * @example {{jsxref("Global_Objects/Date/toString", "Date.prototype.toString()")}}
 */
function JsXReference(
  termName,
  displayName,
  anchor = '',
  dontWrapInCode = false
) {
  const { targetLocale } = this.env;
  const referenceBasePath = `/${targetLocale}/docs/Web/JavaScript/Reference/`;
  let basePath = referenceBasePath;

  const possibleReferenceSectionName = termName.split('/')[0];
  const slug = referenceContentSections.has(
    possibleReferenceSectionName.toLowerCase()
  )
    ? ''
    : initialSlug;

  const addressWithoutSection = termName
    .replace('()', '')
    .replace('.prototype.', '.');
  const address = `${slug ? `${slug}/` : ''}${addressWithoutSection}`;

  basePath =
    !address.includes('..') && address.includes('.')
      ? `${basePath}${address.replace('.', '/')}`
      : `${basePath}${decodeURIComponent(address)}`;

  let encodedAnchor = anchor;
  if (anchor && anchor[0] !== '#') {
    encodedAnchor = `#${anchor}`;
  }

  let content = displayName || termName;
  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  return `<a href="${basePath + encodedAnchor}">${content}</a>`;
}

export default JsXReference;
