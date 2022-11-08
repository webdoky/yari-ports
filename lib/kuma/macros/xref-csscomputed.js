import replacePlaceholders from '../utils/replace-placeholders';

const page = 'computed_value';
const linkText = 'Обчислене значення';

function xrefCssComputed() {
  const { targetLocale } = this.env;

  const link = `<a href="/${targetLocale}/docs/Web/CSS/$1$">$2$</a>`;

  return replacePlaceholders(link, [page, linkText]);
}

export default xrefCssComputed;
