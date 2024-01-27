import LABELS from './labels';

export default function SvgGuides() {
  const {
    env: { path: currentPath, targetLocale },
    registry,
  } = this;

  const pageToNavItem = ({ path, slug, title }) => ({
    hasLocalizedContent: registry.hasPage(slug, true),
    isCurrent: path === currentPath,
    path,
    title,
  });
  return [
    {
      slug: 'Web/SVG/Applying_SVG_effects_to_HTML_content',
      title: LABELS['Applying SVG effects to HTML content'],
    },
    {
      slug: 'Web/SVG/Content_type',
      title: LABELS['Content type'],
    },
    {
      slug: 'Web/SVG/Namespaces_Crash_Course',
      title: LABELS['Namespaces crash course'],
    },
    {
      slug: 'Web/SVG/SVG_animation_with_SMIL',
      title: LABELS['SVG animation with SMIL'],
    },
    {
      slug: 'Web/SVG/SVG_as_an_Image',
      title: LABELS['SVG as an Image'],
    },
  ]
    .map((item) => ({
      ...item,
      path: `/${targetLocale}/docs/${item.slug}`,
    }))
    .map((item) => pageToNavItem(item));
}
