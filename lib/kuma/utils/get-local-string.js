// Note: this is a verbatim from @mdn/yari/kumascript/src/api/util.js

/**
 * Given a set of strings like this:
 *   {
 *    "hello": { "en-US": "Hello!", "de": "Hallo!" },
 *    "bye": { "en-US": "Goodbye!", "de": "Auf Wiedersehen!" }
 *   }
 * Returns the one, which matches the current locale.
 *
 * Example:
 *   getLocalString({"hello": {"en-US": "Hello!", "de": "Hallo!"}},
 *       "hello");
 *   => "Hallo!" (in case the locale is 'de')
 */
function getLocalString(strings, key) {
  if (!Object.prototype.hasOwnProperty.call(strings, key)) {
    return key;
  }

  let lang = this.env.targetLocale;
  if (!(lang in strings[key])) {
    lang = 'en-US';
  }

  return strings[key][lang];
}

export default getLocalString;
