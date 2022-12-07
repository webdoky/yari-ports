function containsTag(tagList, tagParameter) {
  if (!tagList) return false;
  if (!tagParameter) return 0;
  const tag = tagParameter.toLowerCase();
  return tagList.some((tagListItem) => tagListItem.toLowerCase() === tag);
}

export default function GeneralLinks() {
  const {
    env: { path: currentPath, tags, targetLocale },
    registry,
  } = this;
  const pageHtmlTag =
    tags.find(
      (tag) => tag !== 'HTML Elements' && `${tag}`.slice(0, 5) === 'HTML ',
    ) || '';

  const links = [];
  if (pageHtmlTag) {
    // Find the pages, sub-pages of HTML/Element that are tagged with that specific tag
    const htmlPages = registry.getChildren('Web/HTML/Element', false); // Get subpages, including tags
    htmlPages.sort((a, b) => a.data.slug.localeCompare(b.data.slug))
    links.push(
      ...htmlPages
        .filter((htmlPage) => containsTag(htmlPage.tags, pageHtmlTag))
        .map((htmlPage) => {
          const elementTagName = htmlPage.data.slug
            .split('/')
            .pop(-1)
            .toLowerCase();
          const path = `/${targetLocale}/docs/Web/HTML/Element/${elementTagName}`;
          return {
            hasLocalizedContent: htmlPage.hasLocalizedContent,
            isCurrent: path === currentPath,
            path,
            title:
              elementTagName === 'heading_elements'
                ? '<h1>-<h6>'
                : `<${elementTagName}>`,
          };
        }),
    );
  }
  return links;
}
