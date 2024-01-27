import ATTRIBUTES from './attributes';
import ELEMENTS from './elements';
import GLOBAL_ATTRIBUTES from './global-attributes';
import INPUT_TYPES from './input-types';
import labels from './labels';

function HtmlReferences() {
  const { env: { path: currentPath, targetLocale }, registry } = this;
  const webHtmlPath = `/${targetLocale}/docs/Web/HTML/`;

  const elementsItems = ELEMENTS.map((elementName) => ({
    path: `${webHtmlPath}Element/${elementName}`,
    title: `<${elementName}>`,
  }));

  const globalAttributesItems = GLOBAL_ATTRIBUTES.map((attributeName) => ({
    path: `${webHtmlPath}Global_attributes/${attributeName}`,
    title: attributeName,
  }));

  const attributesItems = ATTRIBUTES.map((attributeName) => ({
    path: `${webHtmlPath}Attributes/${attributeName}`,
    title: attributeName,
  }));

  const inputTypes = INPUT_TYPES.map((inputType) => ({
    path: `${webHtmlPath}Element/input/${inputType}`,
    title: `<input type="${inputType}">`,
  }));

  const pageToNavItem = ({ path, title }) => ({
    hasLocalizedContent: registry.hasPage(path.replace(webHtmlPath, 'Web/HTML/'), true),
    isCurrent: path === currentPath,
    path,
    title,
  });

  return [
    {
      title: labels['HTML elements'],
      items: elementsItems.map((item) => pageToNavItem(item)),
      expanded: elementsItems.some(({ path }) => path === currentPath),
    },
    {
      title: labels['Global attributes'],
      items: globalAttributesItems.map((item) => pageToNavItem(item)),
      expanded: globalAttributesItems.some(({ path }) => path === currentPath),
    },
    {
      title: labels.Attributes,
      items: attributesItems.map((item) => pageToNavItem(item)),
      expanded: attributesItems.some(({ path }) => path === currentPath),
    },
    {
      title: labels['<input> types'],
      items: inputTypes.map((item) => pageToNavItem(item)),
      expanded: inputTypes.some(({ path }) => path === currentPath),
    },
  ];
}

export default HtmlReferences;
