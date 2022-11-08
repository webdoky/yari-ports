// Note: this is a verbatim from @mdn/yari/kumascript/src/api/util.js

function spacesToUnderscores(text) {
  return text.replace(/ |(%20)/g, '_');
}

export default spacesToUnderscores;
