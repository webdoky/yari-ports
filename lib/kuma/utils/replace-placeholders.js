// Note: This is a verbatim from @mdn/yari/kumascript/src/api/mdn.js

/**
 * Given a string, replaces all placeholders outlined by
 * $1$, $2$, etc. (i.e. numeric placeholders) or
 * $firstVariable$, $secondVariable$, etc. (i.e. string placeholders)
 * within it.
 *
 * If numeric placeholders are used, the 'replacements' parameter
 * must be an array. The number within the placeholder indicates
 * the index within the replacement array starting by 1.  If
 * string placeholders are used, the 'replacements' parameter must
 * be an object. Its property names represent the placeholder
 * names and their values the values to be inserted.
 *
 * Examples:
 *   replacePlaceholders("$1$ $2$, $1$ $3$!",
 *                       ["hello", "world", "contributor"])
 *   => "hello world, hello contributor!"
 *
 *   replacePlaceholders("$hello$ $world$, $hello$ $contributor$!",
 *       {hello: "hallo", world: "Welt", contributor: "Mitwirkender"})
 *   => "hallo Welt, hallo Mitwirkender!"
 */
function replacePlaceholders(string, replacements) {
  function replacePlaceholder(placeholder) {
    // eslint-disable-next-line unicorn/prefer-string-slice
    let index = placeholder.substring(1, placeholder.length - 1);
    if (!Number.isNaN(Number(index))) {
      index -= 1;
    }
    return index in replacements ? replacements[index] : '';
  }

  return string.replace(/\$\w+\$/g, replacePlaceholder);
}

export default replacePlaceholders;
