import icon from '../../../icons/flask-fill.js';

const title =
  'Це — експериментальний API, який не слід використовувати в робочому коді.';

function experimentalInline() {
  return `<span class="badge__inline" title="${title}">${icon}</span>`;
}

export default experimentalInline;
