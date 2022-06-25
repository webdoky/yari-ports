const { default: cssref } = require('./macros/css-ref');
const { default: jssidebar } = require('./macros/js-sidebar');
const { default: jsref } = require('./macros/js-ref');
const { default: readonlyinline } = require('./macros/read-only-inline');
const { default: glossary } = require('./macros/glossary');
const { default: jsxref } = require('./macros/jsxref');
const { default: nonStandardInline } = require('./macros/non-standard-inline');
const { default: nonStandardHeader } = require('./macros/non-standard-header');
const { default: deprecatedInline } = require('./macros/deprecated-inline');
const { default: experimentalInline } = require('./macros/experimental-inline');
const { default: optionalInline } = require('./macros/optional-inline');
const { default: interwiki } = require('./macros/interwiki');
const { default: bug } = require('./macros/bug');
const { default: cssxref } = require('./macros/cssxref');
const { default: cssSyntax } = require('./macros/csssyntax');
const { default: specifications } = require('./macros/specifications');
const { default: compat } = require('./macros/compat');
const { default: deprecatedHeader } = require('./macros/deprecated-header');
const { default: liveSampleUrl } = require('./macros/live-sample-url');
const { default: embedLiveSample } = require('./macros/embed-live-sample');
const {
  default: embedInteractiveExample,
} = require('./macros/embed-interactive-example');
const { default: htmlElement } = require('./macros/html-element');
const { default: xrefCssInitials } = require('./macros/xref-cssinitial');
const { default: xrefCssInherited } = require('./macros/xref-cssinherited');
const { default: xrefCssComputed } = require('./macros/xref-csscomputed');
const { default: cssInfo } = require('./macros/cssinfo');
const {
  default: availableInWorkers,
} = require('./macros/available-in-workers');
const { parseMacroArgs, extractMacros } = require('./match');

// interface Context {
//   path: string, // current page path
//   slug: string, // current page slug
//   registry: {
//      getPagesData: Iterable<Page> // function for getting all available pages from registry
//      getPageBySlug: (a: string) => Page // function for getting a page by it's slug
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
    'non-standard_header': nonStandardHeader,
    deprecated_inline: deprecatedInline,
    optional_inline: optionalInline,
    interwiki,
    bug,
    availableinworkers: availableInWorkers,
    experimental_inline: experimentalInline,
    cssxref,
    deprecated_header: deprecatedHeader,
    specifications,
    compat,
    livesampleurl: liveSampleUrl,
    htmlelement: htmlElement,
    embedlivesample: embedLiveSample,
    embedinteractiveexample: embedInteractiveExample,
    csssyntax: cssSyntax,
    cssinfo: cssInfo,
    xref_cssinitial: xrefCssInitials,
    xref_cssinherited: xrefCssInherited,
    xref_csscomputed: xrefCssComputed,
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
