import cssref from './macros/css-ref/index.js';
import jssidebar from './macros/js-sidebar/index.js';
import jsref from './macros/js-ref/index.js';
import readonlyinline from './macros/read-only-inline.js';
import glossary from './macros/glossary.js';
import jsxref from './macros/jsxref.js';
import nonStandardInline from './macros/non-standard-inline.js';
import nonStandardHeader from './macros/non-standard-header.js';
import deprecatedInline from './macros/deprecated-inline.js';
import experimentalInline from './macros/experimental-inline.js';
import optionalInline from './macros/optional-inline.js';
import interwiki from './macros/interwiki.js';
import bug from './macros/bug.js';
import cssxref from './macros/cssxref.js';
import cssSyntax from './macros/csssyntax/index.js';
import specifications from './macros/specifications.js';
import compat from './macros/compat/index.js';
import deprecatedHeader from './macros/deprecated-header.js';
import liveSampleUrl from './macros/live-sample-url.js';
import embedLiveSample from './macros/embed-live-sample.js';
import embedInteractiveExample from './macros/embed-interactive-example.js';
import htmlElement from './macros/html-element.js';
import xrefCssInitials from './macros/xref-cssinitial.js';
import xrefCssInherited from './macros/xref-cssinherited.js';
import xrefCssComputed from './macros/xref-csscomputed.js';
import cssInfo from './macros/cssinfo.js';
import availableInWorkers from './macros/available-in-workers.js';
import domxref from './macros/domxref.js';
import ariarole from './macros/ariarole.js';
import htmlattrdef from './macros/htmlattrdef.js';
import htmlattrxref from './macros/htmlattrxref.js';

export { parseMacroArgs, extractMacros } from './match.js';

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
export function macros(context) {
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
    domxref,
    ariarole,
    htmlattrdef,
    htmlattrxref,
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
