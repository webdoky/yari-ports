const str = 'Тільки для читання ';
const title = 'Це значення змінити не можна.';

function readOnlyInline() {
  return `<span title="${title}" class="badge__inline badge__readonly">${str}</span>`;
}

export default readOnlyInline;
