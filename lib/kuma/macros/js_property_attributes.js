function jsPropertyAttributes(isWritable, isEnumerable, isConfigurable) {
  const { title } = this;

  const header = `Атрибути властивості <code>${title}</code>`;
  const writable_name = 'Записна';
  const enumerable_name = 'Перелічувана';
  const configurable_name = 'Конфігуровна';
  const yes = 'так';
  const no = 'ні';

  return `<table class="wd--standard-table">
  <thead>
    <tr>
      <th class="header" colspan="2">${header}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${writable_name}</td>
      <td>${isWritable ? yes : no}</td>
    </tr>
    <tr>
      <td>${enumerable_name}</td>
      <td>${isEnumerable ? yes : no}</td>
    </tr>
    <tr>
      <td>${configurable_name}</td>
      <td>${isConfigurable ? yes : no}</td>
    </tr>
  </tbody>
</table>`;
}

export default jsPropertyAttributes;
