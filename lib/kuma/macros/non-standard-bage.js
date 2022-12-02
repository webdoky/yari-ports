/**
 * Inserts a badge indicating a term or API is non-standard.
 * Parameters: none
 * @returns {string}
 */
export default function NonStandardBadge() {
  return `
  <abbr class="icon icon-nonstandard" title="Нестандартне. Перевірте кросбраузерну підтримку перед застосуванням.">
      <span class="visually-hidden">Нестандартне</span>
  </abbr>`;
}
