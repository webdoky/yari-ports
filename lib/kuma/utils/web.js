const web = {
  link(uri, text, title, target) {
    return `<a
          href="${spacesToUnderscores(htmlEscape(uri))}"
          ${title ? ` title="${htmlEscape(title)}"` : ''}
          ${target ? ` target="${util.htmlEscape(target)}"` : ''}
          >${util.htmlEscape(text || uri)}</a>`;
  },
};

export default web;
