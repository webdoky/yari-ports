const page = 'inheritance';
const linkText = 'Успадковується';
const { replacePlaceholders } = require('@mdn/yari/kumascript/src/api/mdn');

function xrefCssInherited() {
  const { targetLocale } = this;

  let link = '<a href="/' + targetLocale + '/docs/Web/CSS/$1$">$2$</a>';

  return replacePlaceholders(link, [page, linkText]);
}

module.exports.default = xrefCssInherited;
