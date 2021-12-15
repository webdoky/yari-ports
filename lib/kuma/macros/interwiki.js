function interwiki(prefix, path, caption) {
  title = caption || path;

  switch (prefix) {
    case 'wikipedia':
      return `<a href="https://uk.wikipedia.org/wiki/${path}" title="${title}">${title}</a>`;
    case 'wikimo':
      return `<a href="https://wiki.mozilla.org/${path}" title="${title}">${title}</a>`;
    default:
      return `Unknown prefix: ${prefix}`;
  }
}

module.exports.default = interwiki;
