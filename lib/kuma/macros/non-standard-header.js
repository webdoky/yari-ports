const text = 'Не стандартизовано';
const stringExtended =
  'Це — нестандартний функціонал, і стандартизувати його ніхто не планує. Його не слід використовувати на вебсайтах у відкритому вебі, оскільки він не буде працювати для всіх користувачів. Також можливі суттєві (і часто — несумісні) відмінності між реалізаціями, а поведінка може змінитися у майбутньому.';

function nonStandardInline() {
  return `
<div class="notecard__warning">
  <p><strong>${text}:</strong> ${stringExtended}</p>
</div>
`;
}

export default nonStandardInline;
