const str = 'Не стандартизовано';
const strExtended =
  'Це — нестандартний функціонал, і стандартизувати його ніхто не планує. Його не слід використовувати на вебсайтах у відкритому вебі, оскільки він не буде працювати для всіх користувачів. Також можливі суттєві (і часто — несумісні) відмінності між реалізаціями, а поведінка може змінитися у майбутньому.';

function nonStandardInline() {
  return `
<div class="notecard__warning">
  <p><strong>${str}:</strong> ${strExtended}</p>
</div>
`;
}

module.exports.default = nonStandardInline;
