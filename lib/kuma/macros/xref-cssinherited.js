import replacePlaceholders from '../utils/replace-placeholders';

const page = 'inheritance';
const linkText = 'Успадковується';

function xrefCssInherited() {
  const { targetLocale } = this;

  const link = `<a href="/${targetLocale}/docs/Web/CSS/$1$">$2$</a>`;

  return replacePlaceholders(link, [page, linkText]);
}

export default xrefCssInherited;
