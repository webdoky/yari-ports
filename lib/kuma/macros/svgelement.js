import htmlEscape from '../utils/html-escape.js';

function svgElement(termName) {
  const { targetLocale } = this;

  const title = `<${termName}>`;

  return `<a href="/${targetLocale}/docs/Web/SVG/Element/${termName}"><code>${htmlEscape(
    title
  )}</code></a>`;
}

export default svgElement;
