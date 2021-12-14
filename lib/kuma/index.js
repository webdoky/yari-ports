const { default: cssref } = require('./macros/css-ref');
const { default: jssidebar } = require('./macros/js-sidebar');
const { default: jsref } = require('./macros/js-ref');
const { default: readonlyinline } = require('./macros/read-only-inline');
const { default: glossary } = require('./macros/glossary');
const { default: jsxref } = require('./macros/jsxref');
const { default: nonStandardInline } = require('./macros/non-standard-inline');
const { default: deprecatedInline } = require('./macros/deprecated-inline');
const { default: optionalInline } = require('./macros/optional-inline');
const { parseMacroArgs, extractMacros } = require('./match');

// interface Context {
//   path: string, // current page path
//   slug: string, // current page slug
//   registry: {
//      getPagesData: Iterable<Page> // function for getting all available pages from registry
//    },
//   targetLocale: string,
// }

/**
 * Wrapper around simplified implementation of Kuma macros
 * @param {*} context Context object (see the interface above)
 * @returns {
 *  macroDictionary
 *  lookupMacro
 * } where lookupMacro is the function to be used for accessing macros
 */
function macros(context) {
  const macroDictionary = {
    cssref,
    jssidebar,
    jsref,
    readonlyinline,
    glossary,
    jsxref,
    'non-standard_inline': nonStandardInline,
    deprecated_inline: deprecatedInline,
    optional_inline: optionalInline,
  };

  // Attach outside context, like page registry or locale info to all macro functions
  Object.keys(macroDictionary).forEach((key) => {
    macroDictionary[key] = macroDictionary[key].bind(context);
  });

  const lookupMacro = (name) => {
    const lowercaseName = name.toLowerCase();
    return macroDictionary[lowercaseName] || undefined;
  };

  return {
    dictionary: macroDictionary,
    lookup: lookupMacro,
  };
}

module.exports = {
  macros,
  parseMacroArgs,
  extractMacros,
};
