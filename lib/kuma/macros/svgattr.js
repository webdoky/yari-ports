// eslint-disable-next-line unicorn/prevent-abbreviations
export default function SVGAttr(name) {
  const {
    env: { targetLocale },
  } = this;
  const url = `/${targetLocale}/docs/Web/SVG/Attribute/${name}`;
  return `<code><a href="${url}">${name}</a></code>`;
}
