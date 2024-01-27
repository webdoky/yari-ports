import ATTRIBUTES from './attributes';
import ELEMENTS from './elements';
import LABELS from './labels';

export default function SvgReferences() {
  const {
    env: { path: currentPath, targetLocale },
    registry,
  } = this;
  function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
    return titleA.localeCompare(titleB, targetLocale);
  }
  const pageToNavItem = ({ path, slug, title }) => ({
    hasLocalizedContent: registry.hasPage(slug, true),
    isCurrent: path === currentPath,
    path,
    title,
  });
  let elements = ELEMENTS.map((element) => ({
    slug: `Web/SVG/Element/${element}`,
    title: `<${element}>`,
  })).map((elementItem) => ({
    ...elementItem,
    path: `/${targetLocale}/docs/${elementItem.slug}`,
  }));
  elements.find(({ slug }) => slug === 'Web/SVG/Element/title').title =
    LABELS['<title> – the SVG accessible name element'];
  elements.sort(sortByTitle);
  elements = elements.map((element) => pageToNavItem(element));

  let attributes = ATTRIBUTES.map((attribute) => ({
    slug: `Web/SVG/Attribute/${attribute}`,
    title: attribute,
  })).map((attributeItem) => ({
    ...attributeItem,
    path: `/${targetLocale}/docs/${attributeItem.slug}`,
  }));
  attributes.find(
    ({ slug }) => slug === 'Web/SVG/Attribute/crossorigin',
  ).title = LABELS['SVG attribute: crossorigin'];
  attributes.find(
    ({ slug }) => slug === 'Web/SVG/Attribute/Conditional_Processing',
  ).title = LABELS['SVG Conditional Processing Attributes'];
  attributes.find(({ slug }) => slug === 'Web/SVG/Attribute/Core').title =
    LABELS['SVG Core Attributes'];
  attributes.find(({ slug }) => slug === 'Web/SVG/Attribute/Events').title =
    LABELS['SVG Event Attributes'];
  attributes.find(
    ({ slug }) => slug === 'Web/SVG/Attribute/Presentation',
  ).title = LABELS['SVG Presentation Attributes'];
  attributes.find(({ slug }) => slug === 'Web/SVG/Attribute/Styling').title =
    LABELS['SVG Styling Attributes'];
  attributes.sort(sortByTitle);
  attributes = attributes.map((attribute) => pageToNavItem(attribute));

  return [
    {
      expanded: elements.some(({ isCurrent }) => isCurrent),
      items: elements,
      title: LABELS.Elements,
    },
    {
      expanded: elements.some(({ isCurrent }) => isCurrent),
      items: attributes,
      title: LABELS.Attributes,
    },
  ];
}
