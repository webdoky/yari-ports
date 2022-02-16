const page = 'computed_value';
const linkText = 'Обчислене значення';
const { replacePlaceholders } = require('@mdn/yari/kumascript/src/api/mdn');

function xrefCssComputed() {
  const { targetLocale } = this;

  let link = '<a href="/' + targetLocale + '/docs/Web/CSS/$1$">$2$</a>';

  return replacePlaceholders(link, [page, linkText]);
}

module.exports.default = xrefCssComputed;
