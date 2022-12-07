import labels from './labels';

function generalLinks() {
  const {
    env: { path: currentPath, targetLocale },
    registry,
  } = this;
  return [
    {
      slug: `Web/JavaScript`,
      title: labels.JavaScript,
    },
    {
      slug: `Web/JavaScript/Tutorials`,
      title: labels.Tutorials,
    },
  ].map(({ slug, ...otherAttributes }) => ({
    ...otherAttributes,
    hasLocalizedContent: registry.hasPage(slug, true),
    path: `/${targetLocale}/docs/${slug}`,
    isCurrent: `/${targetLocale}/docs/${slug}` === currentPath,
  }));
}

export default generalLinks;
