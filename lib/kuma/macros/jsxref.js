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

function jsxref(termName, displayName, anchor = '', dontWrapInCode = false) {
  const { targetLocale } = this;
  const referenceBasePath = `/${targetLocale}/docs/Web/JavaScript/Reference/`;
  let basePath = referenceBasePath;
  const possibleReferenceSectionName = termName.split('/')[0];
  const slug = referenceContentSections.has(
    possibleReferenceSectionName.toLowerCase(),
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

export default jsxref;
