function specifications(explicitQuery) {
  const { browserCompat: implicitQuery } = this;

  if (!explicitQuery && !implicitQuery) {
    throw new Error('No query provided');
  }

  return `
<div class="bcd__container" data-bcd-query="${explicitQuery || implicitQuery}">
  If you're able to see this, something went wrong on this page.
</div>`;
}

module.exports.default = specifications;
