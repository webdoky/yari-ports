import ariarole from './macros/ariarole';
import availableInWorkers from './macros/available-in-workers';
import bug from './macros/bug';
import compat from './macros/compat/index';
import cssref from './macros/css-ref/index';
import cssInfo from './macros/cssinfo';
import cssSyntax from './macros/csssyntax/index';
import cssxref from './macros/cssxref';
import DeprecatedGeneric from './macros/deprecated-generic';
import deprecatedHeader from './macros/deprecated-header';
import deprecatedInline from './macros/deprecated-inline';
import domxref from './macros/domxref';
import EmbedGhLiveSample from './macros/embed-gh-live-sample';
import embedInteractiveExample from './macros/embed-interactive-example';
import embedLiveSample from './macros/embed-live-sample';
import experimentalInline from './macros/experimental-inline';
import glossary from './macros/glossary';
import htmlElement from './macros/html-element';
import htmlattrdef from './macros/htmlattrdef';
import htmlattrxref from './macros/htmlattrxref';
import HttpHeader from './macros/http-header';
import interwiki from './macros/interwiki';
import jsPropertyAttributes from './macros/js_property_attributes';
import jsref from './macros/js-ref/index';
import jssidebar from './macros/js-sidebar/index';
import jsxref from './macros/jsxref';
import liveSampleUrl from './macros/live-sample-url';
import noTagOmission from './macros/no_tag_omission';
import nonStandardHeader from './macros/non-standard-header';
import nonStandardInline from './macros/non-standard-inline';
import optionalInline from './macros/optional-inline';
import readonlyinline from './macros/read-only-inline';
import specifications from './macros/specifications';
import svgelement from './macros/svgelement';
import xrefCssComputed from './macros/xref-csscomputed';
import xrefCssInherited from './macros/xref-cssinherited';
import xrefCssInitials from './macros/xref-cssinitial';

export { extractMacros, parseMacroArguments } from './match';

export function injectCallMacro(context) {
  const extendedContext = {
    ...context,
    callMacro: (function_, ...arguments_) =>
      function_.call(extendedContext, ...arguments_),
  };

  return extendedContext;
}

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
    no_tag_omission: noTagOmission,
    svgelement,
    js_property_attributes: jsPropertyAttributes,
    embedghlivesample: EmbedGhLiveSample,
    deprecatedgeneric: DeprecatedGeneric,
    httpheader: HttpHeader,
  };

  // Attach outside context, like page registry or locale info to all macro functions
  for (const key of Object.keys(macroDictionary)) {
    macroDictionary[key] = macroDictionary[key].bind(injectCallMacro(context));
  }

  const lookupMacro = (name) => {
    const lowercaseName = name.toLowerCase();
    return macroDictionary[lowercaseName] || undefined;
  };

  return {
    dictionary: macroDictionary,
    lookup: lookupMacro,
  };
}
