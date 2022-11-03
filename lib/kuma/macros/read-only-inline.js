const text = 'Тільки для читання ';
const title = 'Це значення змінити не можна.';

function readOnlyInline() {
  return `<span title="${title}" class="badge__inline badge__readonly">${text}</span>`;
}

export default readOnlyInline;
