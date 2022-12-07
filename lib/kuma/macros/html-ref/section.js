import * as _ from 'lodash';

export default function HtmlReferenceSection(slugRoot, title) {
  const {
    registry,
    env: { path },
  } = this;
  const htmlElementPages = registry.getChildren(slugRoot, false);
  htmlElementPages.sort((a, b) => a.data.slug.localeCompare(b.data.slug));
  return {
    hasLocalizedContent: htmlElementPages.some(
      (page) => page.hasLocalizedContent,
    ),
    items: htmlElementPages.map((page) => ({
      hasLocalizedContent: page.hasLocalizedContent,
      isCurrent: path === page.path,
      path: page.path,
      title: page.data.title,
    })),
    title: title,
  };
}
