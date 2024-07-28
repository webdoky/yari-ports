/**
 * Inserts a string
 * warning about unstable specification
 * @returns {string} Compatibility warning HTML
 */
export default function SeeCompatTable() {
  return `<div class="notecard__experimental">
    <h4>Експериментальне</h4>
    <p>
      <strong>
        Це <a href='/uk/docs/MDN/Contribute/Guidelines/Conventions_definitions#eksperymentalne'>експериментальна технологія</a>
      </strong>
      <br />
      Перед її використанням у промисловій розробці уважно перевірте <a href='#sumisnist-iz-brauzeramy'>Таблицю сумісності з браузерами</a>.
    </p>
  </div>`;
}
