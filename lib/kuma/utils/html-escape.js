// Note: this is a verbatim from @mdn/yari/kumascript/src/api/util.js

/**
 * #### htmlEscape(string)
 * Escape the given string for HTML inclusion.
 *
 * @param {string} s
 * @return {string}
 */
function htmlEscape(s) {
  return `${s}`
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export default htmlEscape;
