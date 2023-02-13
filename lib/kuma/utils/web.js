import htmlEscape from './html-escape';
import spacesToUnderscores from './spaces-to-underscores';

const web = {
  link(uri, text, title, target) {
    return `<a
          href="${spacesToUnderscores(htmlEscape(uri))}"
          ${title ? ` title="${htmlEscape(title)}"` : ''}
          ${target ? ` target="${htmlEscape(target)}"` : ''}
          >${htmlEscape(text || uri)}</a>`;
  },
};

export default web;
