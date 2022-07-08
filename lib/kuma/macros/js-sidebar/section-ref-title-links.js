import labels from './labels.js';

function refTitleLinks({ targetLocale, path: currentPath }) {
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference`,
      title: labels['Reference'],
    },
  ].map(({ path, ...otherAttrs }) => ({
    ...otherAttrs,
    path,
    isCurrent: path === currentPath,
  }));
}

export default refTitleLinks;
