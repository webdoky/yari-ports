// Note: this is a verbatim from @mdn/yari/kumascript/src/api/mdn.js

/**
 * Given a set of strings like this:
 *     { "en-US": "Foo", "de": "Bar", "es": "Baz" }
 * Return the one which matches the current locale.
 */
function localString(strings, locale) {
  let lang = locale;
  if (!strings[lang]) lang = 'en-US';
  return strings[lang];
}

export default localString;
