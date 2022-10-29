import htmlEscape from '../utils/html-escape.js';
import web from '../utils/web.js';

/**
 * General macro for inserting a deprecation warning.
 *
 * @param {'header' | 'inline' | 'method'} warningIndicatorType The type of warning indicator: inline/header/method
 * @param {string=} obsolescenceVersion The version of obsolescence (optional)
 *                  prepend the version with HTML, CSS, JS, or Gecko for those techs;
 *                  for example "HTML5" to say the content is deprecated in HTML 5.
 * @param {string=} extra Additional information required for the type specified by the
 *                  first parameter ("method" requires the method's name)
 * @returns
 */
export default function DeprecatedGeneric(
  warningIndicatorType,
  obsolescenceVersion,
  extra
) {
  const lang = this.env.targetLocale;
  let textContent = '';
  let version = '';
  let link = '';
  let tip = '';
  if (obsolescenceVersion) {
    let normalizedObsolescenceVersion = obsolescenceVersion.toLowerCase();
    let n = '';
    if (normalizedObsolescenceVersion.startsWith('js')) {
      n = normalizedObsolescenceVersion.substring(2).trim();
      version = 'JavaScript ';
      if (n.length > 0) {
        link = `/${lang}/docs/JavaScript/New_in_JavaScript/${n}`;
      }
    } else if (normalizedObsolescenceVersion.startsWith('css')) {
      n = normalizedObsolescenceVersion.substring(3).trim();
      version = 'CSS ';
    } else if (normalizedObsolescenceVersion.startsWith('html')) {
      n = normalizedObsolescenceVersion.substring(4).trim();
      let N = n[0] === '4' ? '' : n;
      version = 'HTML';
      if (N.length > 0) {
        link = `/${lang}/docs/HTML${N}`;
      } else {
        link = `/${lang}/docs/HTML`;
      }
    } else if (normalizedObsolescenceVersion.startsWith('svg')) {
      n = normalizedObsolescenceVersion.substring(3).trim();
      version = 'SVG ';
    }
    n = n.trim();
    version = n.length > 0 ? version + n : '';
  }
  // If there's a link, turn the version into a link to that URL
  if (link.length > 0) {
    version = web.link(link, version);
  }
  textContent = 'Нерекомендовано';
  if (version.length > 0) {
    textContent += ` від ${version}`;
  }
  const description =
    'Ця можливість більше не рекомендується до використання. Попри те, що частина браузерів досі може її підтримувати, вона може бути вже видалена з відповідних вебстандартів, перебувати в процесі викидання чи бути збереженою виключно з потреб сумісності. Уникайте її використання, а також оновіть наявний код, якщо це можливо; дивіться <a href="#sumisnist-iz-brauzeramy">таблицю сумісності</a> в кінці цієї сторінки для прийняття рішення. Майте на увазі, що ця можливість може перестати працювати будь-коли.';
  switch (warningIndicatorType) {
    case 'inline':
      return `<span class="notecard inline deprecated" title="${htmlEscape(
        tip
      )}">${textContent}</span>`;
    case 'header':
      if (tip.length > 0) {
        textContent += ` ${tip}`;
      }
      return `<div class="notecard deprecated">
            <h4>${textContent}</h4>
            <p>${description}</p>
        </div>`;
    case 'method':
      if (tip.length > 0) {
        textContent += ` ${tip}`;
      }
      return `<div>
            <span class="notecard inline deprecated">${textContent}</span>
            <h3>${extra}</h3>
        </div>`;
    default:
      return '';
  }
}
