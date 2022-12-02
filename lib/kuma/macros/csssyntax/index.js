// Note! This is in many ways copied verbatim from @mdn/yari
import readJsonDependency from '../../../read-json-dependency';
import syncReplace from '../../utils/sync-replace';

import {
  operators,
  s_named_color_link,
  s_syntax_value_definition,
  s_system_color_link,
  s_where,
  typeInfo,
} from './localizations';

const atRules = readJsonDependency('mdn-data/css/at-rules.json');
const selectors = readJsonDependency('mdn-data/css/selectors.json');
const types = readJsonDependency('mdn-data/css/types.json');
const properties = readJsonDependency('mdn-data/css/properties.json');
const syntaxes = readJsonDependency('mdn-data/css/syntaxes.json');
const units = readJsonDependency('mdn-data/css/units.json');

const mdnDataCSS = {
  atRules,
  selectors,
  types,
  properties,
  syntaxes,
  units,
};

function addBrackets(string_) {
  return /\(\)$/.test(string_) ? string_ : `${string_}()`;
}
function cssSyntax(termName, initialAtRule) {
  const { targetLocale, slug } = this.env;
  let atRule = initialAtRule;

  const externallyDescribedTypesData = {
    'named-color': {
      link: s_named_color_link,
    },
    'deprecated-system-color': {
      link: s_system_color_link,
    },
  };

  const data = {
    ...mdnDataCSS,
    externallyDescribedTypes: externallyDescribedTypesData,
  };
  let name =
    termName ||
    (slug ? slug.split('/').pop().toLowerCase() : 'preview-wiki-content');

  // "Conflicting" documents have an MD5 postfix to deal with multiple conflicting documents.
  // In here we need a clean name so remove the MD5 part.
  name = name.replace(/(.*)_[\da-f]{32}$/, (_, x) => x);
  let rawSyntax = '';
  let formattedSyntax = '';

  function buildLink(match, type) {
    let link = `/${targetLocale}/docs/Web/CSS/`;
    let title = '';
    const propertyName = type.match(/'(.+?)'/);
    // Handle property references like <'color'>
    if (propertyName) {
      if (data.properties[propertyName[1]]) {
        title = data.properties[propertyName[1]].syntax;
      }
      return `<a href="${link}${propertyName[1]}" title="${title}">&lt;${propertyName[0]}&gt;</a>`;
      // Handle basic types
    }
    if (Object.hasOwn(typeInfo, type)) {
      const typeLinkName = typeInfo[type].typeLinkName || type;
      link += typeLinkName;
      title = typeInfo[type].title || '';
      // Handle types which we want to describe using a link to a different page
    } else if (Object.hasOwn(data.externallyDescribedTypes, type)) {
      return `<a href="/${targetLocale}${data.externallyDescribedTypes[type].link}">&lt;${type}&gt;</a>`;
      // Handle advanced types having their syntax defined within the 'CSSData' template
    } else if (data.syntaxes[type]) {
      return `<a href="#${type}">&lt;${type}&gt;</a>`;
      // Handled advanced types having their syntax not defined
    } else {
      return `&lt;${type}&gt;`;
    }
    return `<a href="${link}" title="${title}">&lt;${type}&gt;</a>`;
  }
  function formatSyntax(rawSyntaxString) {
    if (rawSyntaxString === '') {
      return '';
    }
    let formattedSyntaxString = rawSyntaxString;
    for (const operator of operators) {
      if (
        formattedSyntaxString.includes('\n') &&
        operator.title === 'Curly braces'
      ) {
        return '';
      }
      formattedSyntaxString = formattedSyntaxString.replace(
        operator.regexp,
        function (match, text) {
          let linkText = match;
          if (match.includes('*')) {
            linkText = '*';
          } else if (match.includes('}')) {
            linkText = '}';
          } else if (typeof text === 'string') {
            linkText = text;
          }
          let output = `<a href="/${targetLocale}/docs/Web/CSS/${s_syntax_value_definition}#${operator.anchor.toLowerCase()}" title="${
            operator.title
          }">${linkText}</a>`;
          if (linkText === '|') {
            output = ` ${output} `;
          } else if (linkText === '*' || linkText === '}') {
            output = text + output;
          }
          return output;
        },
      );
    }
    formattedSyntaxString = syncReplace(
      formattedSyntaxString,
      /<([\d'()a-z-]+?( \[-?(\d+|∞),(\d+|∞)])?)>/gi,
      buildLink,
    );
    return formattedSyntaxString;
  }
  function formatTypesSyntax(formattedSyntaxString, describedTypes) {
    let formattedTypesSyntax = '';
    const syntaxTypes = [];
    const typeAnchorAttributes = formattedSyntaxString.match(/href=".+?"/g);
    if (typeAnchorAttributes) {
      for (const typeAnchorAttribute of typeAnchorAttributes) {
        const type = typeAnchorAttribute.match(/href="(?:#|.*\/)(.+?)"/);
        if (
          !syntaxTypes.includes(type[1]) &&
          !type[1].includes(s_syntax_value_definition)
        ) {
          // Some data type page names have '_value' appended,
          // which needs to be removed in order to find the syntax
          const subType = type[1].replace('_value', '');
          // Describe this type if it exists in "syntaxes" and
          // it *does not* exist in externallyDescribedTypes
          if (
            Object.hasOwn(data.syntaxes, subType) &&
            !Object.hasOwn(data.externallyDescribedTypes, subType)
          ) {
            syntaxTypes.push(subType);
          }
        }
      }
      let typesSyntax = '';
      if (syntaxTypes.length > 0) {
        for (const [index, type] of syntaxTypes.entries()) {
          // Avoid recursions by checking whether a type was already
          // described before
          // check whether https://github.com/mdn/data/pull/66 was merged
          const syntax = data.syntaxes[type].syntax || data.syntaxes[type];
          if (!describedTypes.includes(type)) {
            typesSyntax += `<span id="${type}">&lt;${type}&gt;</span> = ${formatSyntax(
              syntax,
            )}`;
            if (index < syntaxTypes.length - 1) {
              typesSyntax += '<br/>';
            }
            describedTypes.push(type);
          }
        }
        if (typesSyntax !== '') {
          formattedTypesSyntax +=
            `<p style="font-family:Open Sans,Arial,` +
            `sans-serif; margin: 10px 0 0 0;">${s_where}<br/><code style="font-family:Consolas,Monaco,` +
            `&quot;Andale Mono&quot;,monospace;">${typesSyntax}</code></p>`;
        }
      }
      return (
        formattedTypesSyntax + formatTypesSyntax(typesSyntax, describedTypes)
      );
    }
    return formattedTypesSyntax;
  }
  if (!atRule) {
    let matches = null;
    if (slug) {
      matches = slug.match(/\/CSS\/(@.+?)(?=\/)/);
    }
    if (matches) {
      [, atRule] = matches;
    }
  }
  if (name === 'preview-wiki-content') {
    formattedSyntax =
      '<span style="color:red;">Інформація недоступна в попередньому перегляді</span>';
  } else {
    if (atRule) {
      if (
        data.atRules[atRule] &&
        data.atRules[atRule].descriptors &&
        data.atRules[atRule].descriptors[name]
      ) {
        rawSyntax = data.atRules[atRule].descriptors[name].syntax;
      }
    } else if (name[0] === '@') {
      if (data.atRules[name] && data.atRules[name].syntax) {
        rawSyntax = data.atRules[name].syntax;
      }
    } else if (name[0] === ':' && typeof data.selectors[name] !== 'undefined') {
      rawSyntax = data.selectors[name].syntax;
    } else if (data.properties[name]) {
      rawSyntax = data.properties[name].syntax;
    } else if (data.syntaxes[addBrackets(name)]) {
      rawSyntax = data.syntaxes[addBrackets(name)].syntax;
    }
    formattedSyntax = formatSyntax(rawSyntax);
    formattedSyntax += formatTypesSyntax(formattedSyntax, []);
  }
  let out = '';
  out = !formattedSyntax
    ? '<div class="notecard warning"><h4>Інформація про синтаксис недоступна</h4><p>Жодного значення не знайшлося в базі даних.</p></div>'
    : `<pre>${formattedSyntax}</pre>`;

  return out;
}

export default cssSyntax;
