export default function GlossaryDisambiguation() {
  const {
    env: { slug, targetLocale },
    registry,
  } = this;
  const children = registry.getChildren(slug, true);
  children.sort((a, b) => a.title.localeCompare(b.title, targetLocale));
  const definitions = children.map(
    ({ content, path, title }) =>
      `<dt><a href="${path}">${title}</a></dt><dd>${content
        .split('\n\n')
        .filter(Boolean)
        .find((line) => !line.trim().startsWith('{{'))}</dd>`,
  );
  return `<dl>${definitions.join('')}</dl>`;
}
