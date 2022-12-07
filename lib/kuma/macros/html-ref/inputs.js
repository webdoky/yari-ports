import ListSubpagesForReference from '../list-subpages-for-ref';

export default function Inputs() {
  const {
    env: { slug, targetLocale },
  } = this;
  if (!slug.includes('/HTML/Element/input')) {
    return;
  }
  const items = this.callMacro(
    ListSubpagesForReference,
    `${targetLocale}/docs/Web/HTML/Element/input`,
  );
  return [
    {
      expanded: true,
      hasLocalizedContent: items.some(page => page.hasLocalizedContent),
      items,
      title: '<code>Типи &lt;input&gt;</code>',
    },
  ];
}
