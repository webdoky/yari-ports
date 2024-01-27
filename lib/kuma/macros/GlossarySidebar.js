const pageToNavItem = ({ path, slug, title }, currentSlug) => ({
  title,
  path,
  isCurrent: slug === currentSlug,
});

export default function GlossarySidebar() {
  const {
    env: { slug, targetLocale },
    registry,
  } = this;
  const glossaryPages = registry.getChildren('Glossary', false);
  const translatedGlossaryPages = glossaryPages.filter(
    (item) => item.hasLocalizedContent,
  );
  function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
    return titleA.localeCompare(titleB, targetLocale);
  }
  // TODO: we definitely need it typed at some point
  return [
    {
      title: 'Глосарій',
      sections: [
        {
          expanded: true,
          items: translatedGlossaryPages
            .map((item) => pageToNavItem(item, slug))
            .sort(sortByTitle),
          title: 'Терміни',
        },
      ],
    },
  ];
}
