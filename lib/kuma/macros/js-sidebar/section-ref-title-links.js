import labels from './labels';

function referenceTitleLinks({ targetLocale, path: currentPath }) {
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
