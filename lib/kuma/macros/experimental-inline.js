const icon = require('../../../icons/flask-fill');

const title =
  'Це — експериментальний API, який не слід використовувати в робочому коді.';

function experimentalInline() {
  return `<span class="badge__inline" title="${title}">${icon}</span>`;
}

module.exports.default = experimentalInline;
