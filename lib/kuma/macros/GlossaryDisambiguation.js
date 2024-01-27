export default function GlossaryDisambiguation() {
  const {
    env: { slug, targetLocale },
    registry,
  } = this;
  const children = registry.getChildren(slug, true);
  children.sort((a, b) => a.title.localeCompare(b.title, targetLocale));
  const definitions = children.map(
    ({ description, path, title }) =>
      `<dt><a href="${path}">${title}</a></dt><dd>${description}</dd>`,
  );
  return `<dl>${definitions.join('')}</dl>`;
}
