import icon from '../../../icons/delete-bin';

const title =
  'Цей застарілий API більше не повинен використовуватись, хоча ймовірно ще працюватиме.';

function deprecatedInline() {
  return `<span class="badge__inline" title="${title}">${icon}</span>`;
}

export default deprecatedInline;
