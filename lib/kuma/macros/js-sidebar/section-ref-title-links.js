import labels from './labels';

function referenceTitleLinks() {
  const {
    env: { targetLocale, path: currentPath },
    registry,
  } = this;
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference`,
      title: labels.Reference,
    },
  ].map(({ path, ...otherAttributes }) => ({
    ...otherAttributes,
    hasLocalizedContent: registry.hasPage('Web/JavaScript/Reference', true),
    path,
    isCurrent: path === currentPath,
  }));
}

export default referenceTitleLinks;
