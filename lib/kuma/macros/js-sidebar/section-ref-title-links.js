import labels from './labels.js';

function refTitleLinks() {
  const { targetLocale, path: currentPath } = this.env;
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
