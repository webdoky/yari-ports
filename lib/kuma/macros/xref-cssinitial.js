import replacePlaceholders from '../utils/replace-placeholders';

const page = 'initial_value';
const linkText = 'Початкове значення';

function xrefCssInitials() {
  const { targetLocale } = this.env;

  const link = `<a href="/${targetLocale}/docs/Web/CSS/$1$">$2$</a>`;

  return replacePlaceholders(link, [page, linkText]);
}

export default xrefCssInitials;
