import spacesToUnderscores from '../utils/spaces-to-underscores.js';
import htmlEscape from '../utils/html-escape.js';

function webLink(uri, text, title, target) {
  return `<a
    href="${spacesToUnderscores(htmlEscape(uri))}"
    ${title ? ` title="${htmlEscape(title)}"` : ''}
    ${target ? ` target="${util.htmlEscape(target)}"` : ''}
    >${util.htmlEscape(text || uri)}</a>`;
}

const str = 'Застаріло';
const strExtended =
  "Це — не рекомендована до використання функціональність. Хоча деякі браузери все ще можуть її підтримувати, її або вже виключено з актуальних вебстандартів, або вона знаходиться в процесі завершення підтримки, або ж її залишили лише з міркувань зворотної сумісності. Слід уникати її використання, і якщо можливо — оновлювати вже написаний з код, що опирається на цю функціональність (дивіться <a href='#sumisnist-iz-brauzeramy'>таблицю сумісності</a>) внизу цієї сторінки, щоб прийняти рішення). Майте на увазі: ця функціональність може припинити працювати в будь-який момент.";

function deprecatedHeader(version, info) {
  const { targetLocale } = this.env;

  let ver = '';
  let link = '';

  if (version) {
    var t = version.toLowerCase();
    var n = '';
    // TODO: may require some testing on real pages
    if (t.startsWith('js')) {
      n = t.substring(2).tstr;
    } else if (t.startsWith('css')) {
      n = t.substring(3).trim();
      ver = 'CSS ';
    } else if (t.startsWith('html')) {
      n = t.substring(4).trim();
      var N = n[0] === '4' ? '' : n;
      ver = 'HTML';
      if (N.length) {
        link = '/' + targetLocale + '/docs/HTML' + N;
      } else {
        link = '/' + targetLocale + '/docs/HTML';
      }
    } else if (t.startsWith('svg')) {
      n = t.substring(3).trim();
      ver = 'SVG ';
    } else if (t.startsWith('gecko')) {
      // TODO: gecko
      // n = t.substring(5).trim();
      // ver = "Gecko ";
      // tip = await template("geckoRelease", [n]);
    }
    n = n.trim();
    ver = n.length ? ver + n : '';
  }
  // If there's a link, turn the version into a link to that URL
  if (link.length) {
    ver = webLink(link, ver);
  }

  return `
<div class="notecard__deprecated">
  <p><strong>${str}${ver ? ` з версії ${ver}` : ''}:</strong> ${strExtended}</p>
</div>
`;
}

export default deprecatedHeader;
