const page = 'initial_value';
const linkText = 'Початкове значення';
const { replacePlaceholders } = require('@mdn/yari/kumascript/src/api/mdn');

function xrefCssInitials() {
  const { targetLocale } = this;

  let link = '<a href="/' + targetLocale + '/docs/Web/CSS/$1$">$2$</a>';

  return replacePlaceholders(link, [page, linkText]);
}

module.exports.default = xrefCssInitials;
