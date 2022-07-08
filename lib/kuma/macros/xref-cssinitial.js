import replacePlaceholders from '../utils/replace-placeholders.js';
const page = 'initial_value';
const linkText = 'Початкове значення';

function xrefCssInitials() {
  const { targetLocale } = this;

  let link = '<a href="/' + targetLocale + '/docs/Web/CSS/$1$">$2$</a>';

  return replacePlaceholders(link, [page, linkText]);
}

export default xrefCssInitials;
