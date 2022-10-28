/**
 *  Inserts a badge indicating a term or API is non-standard.
 */
export default function NonStandardBadge() {
  return `<abbr class="icon icon-nonstandard" title="Нестандартне. Перевірте сумісність із браузерами перед використанням.">
        <span class="visually-hidden">Нестандартне</span>
    </abbr>`;
}
