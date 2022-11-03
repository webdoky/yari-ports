function cssxref(termName, displayName, anchor = '') {
  const { targetLocale, registry = {} } = this;
  let text = displayName || termName;

  let slug = termName.replace(/&lt;(.*)&gt;/g, '$1');
  // Special case <color>, <flex>, and <position>
  switch (termName) {
    case '&lt;color&gt;': {
      slug = 'color_value';
      break;
    }
    case '&lt;flex&gt;': {
      slug = 'flex_value';
      break;
    }
    case '&lt;position&gt;': {
      slug = 'position_value';
      break;
    }
    default:
  }

  text = text.toLowerCase();
  const fullSlug = `Web/CSS/${slug}`;
  const url = `/${targetLocale}/docs/Web/CSS/${slug}${anchor}`;

  let thisPage = null;
  if ((!displayName || !anchor) && registry && registry.getPageBySlug) {
    thisPage = registry.getPageBySlug(fullSlug);
  }
  const thisPageTags = thisPage ? thisPage.tags : [];

  if (!displayName) {
    // Append parameter brackets to CSS functions
    // TODO: currently it generates broken link for matrix, may want to fix this (on MDN too)
    if (thisPageTags.includes('CSS Function') && !text.endsWith('()')) {
      text += '()';
    }
    // Enclose CSS data types in arrow brackets
    if (thisPageTags.includes('CSS Data Type') && !/^&lt;.+&gt;$/.test(text)) {
      text = `&lt;${text}&gt;`;
    }
  }

  return `<a href="${url}"><code>${text}</code></a>`;
}

export default cssxref;
