// Note: this is a verbatim from @mdn/yari/kumascript/src/api/util.js

function safeDecodeURIComponent(text) {
  // This function will attempt to URI-decode the incoming text, which may
  // or may not be URI-encoded, and if it can't, it assumes the text is not
  // URI-encoded and simply falls back to using the text itself. This exists
  // solely because some localized pages URI-encode the sample ID argument
  // to their "EmbedLiveSample" macro calls, and we need to run the non-URI-
  // encoded sample ID through "slugify()" above prior to URI-encoding it
  // for the live-sample URL.
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export default safeDecodeURIComponent;
