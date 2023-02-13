/**
 * Inserts a link to the specified RFC.
 * If you provide the section number, the URL gets "#section-$2" appended to
 * it, and the default text shown has ", section $2" appended to it.
 *
 * @param {number} RFC number to which to link.
 * @param {string=} linkText Additional link text, to be used to add a name for the RFC
 * @param {number=} rtcSectionNumber Section number within the RTC to link to
 * @returns {string} RFC link
 */
export default function RFC(rfcNumber, linkText, rtcSectionNumber) {
  let link = `https://datatracker.ietf.org/doc/html/rfc${rfcNumber}`;
  let text = '';
  if (linkText) {
    text = `: ${linkText}`;
  }
  if (rtcSectionNumber) {
    link = `${link}#section-${rtcSectionNumber}`;
    text = `, секція ${rtcSectionNumber}${text}`;
  }

  return `<a href="${link}">RFC ${rfcNumber}${text}</a>`;
}
