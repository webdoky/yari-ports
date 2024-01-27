import labels from './labels';

function HtmlGuides() {
  const { env: { path: currentPath, targetLocale }, registry } = this;
  const webHtmlPath = `/${targetLocale}/docs/Web/HTML/`;

  const pageToNavItem = ({ path, title }) => ({
    hasLocalizedContent: registry.hasPage(path.replace(webHtmlPath, 'Web/HTML/'), true),
    isCurrent: path === currentPath,
    path,
    title,
  });
  const items = [
    {
      title: labels['Content categories'],
      path: `${webHtmlPath}Content_categories`,
    },
    {
      title: labels['Block-level elements'],
      path: `${webHtmlPath}Block-level_elements`,
    },
    {
      title: labels['Inline elements'],
      path: `${webHtmlPath}Inline_elements`,
    },
    {
      title: labels['Quirks Mode and Standards Mode'],
      path: `${webHtmlPath}Quirks_Mode_and_Standards_Mode`,
    },
    {
      title: labels['Date and time formats used in HTML'],
      path: `${webHtmlPath}Date_and_time_formats`,
    },
    {
      title: labels['Constraint validation'],
      path: `${webHtmlPath}Constraint_validation`,
    },
    {
      title: labels.Microdata,
      path: `${webHtmlPath}Microdata`,
    },
    {
      title: labels.Microformats,
      path: `${webHtmlPath}microformats`,
    },
    {
      title: labels['Viewport meta tag'],
      path: `${webHtmlPath}Viewport_meta_tag`,
    },
    {
      title: labels['Allowing cross-origin use of images and canvas'],
      path: `${webHtmlPath}CORS_enabled_image`,
    },
  ].map((item) => pageToNavItem(item));
  return items;
}

export default HtmlGuides;
