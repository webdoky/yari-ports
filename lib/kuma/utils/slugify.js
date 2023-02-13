// Note: this is a verbatim from @mdn/yari/kumascript/src/api/util.js
import filenamify from 'filenamify';

const SECTION_ID_DISALLOWED = /["#$%&'()+,/:;=?@[\\\]^`{|}~]/g;

function slugify(text) {
  // Turn the text content of a header, or the value of the "name" attribute,
  // into a slug for use as an ID as well as a filename. Trim it, collapse
  // whitespace gaps into underscores, remove the same special characters that
  // Kuma removes (for consistency, since for example many live-samples depend
  // on this), and finally remove any remaining characters that would not work
  // within a filename on a Windows, Mac OS X, or Unix filesystem.
  // NOTE: These are the constraints that have to be satisfied:
  //    1) the result can be used as a filename on Windows, Mac OS X, and Unix
  //       (this is why the "filenamify" npm package is used)
  //    2) the result will be used as an "id" attribute, so in HTML5 it must
  //       contain at least one character and must not contain any whitespace
  //       characters (the "filenamify" npm package will itself remove
  //       spaces, but since they're useful in breaking up phrases, before we
  //       run "filenamify" we convert whitespace gaps into underscores)
  //    3) many macros use sample ID's that assume that "id" attributes have
  //       had the SECTION_ID_DISALLOWED characters removed, so for now we have
  //       to maintain that legacy
  //    4) there's no need to add constraints that assume the result will be
  //       used as a CSS ID selector, since it will be properly escaped for that
  //       use case (see the "cssesc" code within the "getSection" method of the
  //       HTMLTool below)
  return filenamify(
    text.trim().replace(SECTION_ID_DISALLOWED, '').replace(/\s+/g, '_'),
  );
}

export default slugify;
