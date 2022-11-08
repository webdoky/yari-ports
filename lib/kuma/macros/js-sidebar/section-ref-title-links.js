import labels from './labels';

function referenceTitleLinks() {
  const { targetLocale, path: currentPath } = this.env;
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference`,
      title: labels.Reference,
    },
  ].map(({ path, ...otherAttributes }) => ({
    ...otherAttributes,
    path,
    isCurrent: path === currentPath,
  }));
}

export default referenceTitleLinks;
