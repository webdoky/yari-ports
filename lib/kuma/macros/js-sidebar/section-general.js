import labels from './labels';

function generalLinks({ path: currentPath, targetLocale }) {
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript`,
      title: labels.JavaScript,
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Tutorials`,
      title: labels.Tutorials,
    },
  ].map(({ path, ...otherAttributes }) => ({
    ...otherAttributes,
    path,
    isCurrent: path === currentPath,
  }));
}

export default generalLinks;
