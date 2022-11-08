import icon from '../../../icons/thumbsdown';

const title = 'Цей API не було стандартизовано.';

function nonStandardInline() {
  return `<span class="badge__inline" title="${title}">${icon}</span>`;
}

export default nonStandardInline;
