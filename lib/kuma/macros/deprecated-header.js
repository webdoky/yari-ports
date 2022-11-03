import htmlEscape from '../utils/html-escape';
import spacesToUnderscores from '../utils/spaces-to-underscores';

function webLink(uri, text, title, target) {
  return `<a
    href="${spacesToUnderscores(htmlEscape(uri))}"
    ${title ? ` title="${htmlEscape(title)}"` : ''}
    ${target ? ` target="${htmlEscape(target)}"` : ''}
    >${htmlEscape(text || uri)}</a>`;
}

const text = 'Застаріло';
const stringExtended =
  "Це — не рекомендована до використання функціональність. Хоча деякі браузери все ще можуть її підтримувати, її або вже виключено з актуальних вебстандартів, або вона знаходиться в процесі завершення підтримки, або ж її залишили лише з міркувань зворотної сумісності. Слід уникати її використання, і якщо можливо — оновлювати вже написаний з код, що опирається на цю функціональність (дивіться <a href='#sumisnist-iz-brauzeramy'>таблицю сумісності</a>) внизу цієї сторінки, щоб прийняти рішення). Майте на увазі: ця функціональність може припинити працювати в будь-який момент.";

function deprecatedHeader(version /* info */) {
  const { targetLocale } = this;

  let versionHtml = '';
  let link = '';

  if (version) {
    const t = version.toLowerCase();
    let n = '';
    // TODO: may require some testing on real pages
    if (t.startsWith('js')) {
      n = t.slice(2).tstr;
    } else if (t.startsWith('css')) {
      n = t.slice(3).trim();
      versionHtml = 'CSS ';
    } else if (t.startsWith('html')) {
      n = t.slice(4).trim();
      const N = n[0] === '4' ? '' : n;
      versionHtml = 'HTML';
      link =
        N.length > 0
          ? `/${targetLocale}/docs/HTML${N}`
          : `/${targetLocale}/docs/HTML`;
    } else if (t.startsWith('svg')) {
      n = t.slice(3).trim();
      versionHtml = 'SVG ';
    } else if (t.startsWith('gecko')) {
      // TODO: gecko
      // n = t.substring(5).trim();
      // ver = "Gecko ";
      // tip = await template("geckoRelease", [n]);
    }
    n = n.trim();
    versionHtml = n.length > 0 ? versionHtml + n : '';
  }
  // If there's a link, turn the version into a link to that URL
  if (link.length > 0) {
    versionHtml = webLink(link, versionHtml);
  }

  return `
<div class="notecard__deprecated">
  <p><strong>${text}${
    versionHtml ? ` з версії ${versionHtml}` : ''
  }:</strong> ${stringExtended}</p>
</div>
`;
}

export default deprecatedHeader;
