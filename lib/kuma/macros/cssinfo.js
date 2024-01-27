import readJsonDependency from '../../read-json-dependency';
import getLocalString from '../utils/get-local-string';
import localString from '../utils/local-string';
import replacePlaceholders from '../utils/replace-placeholders';
import syncReplace from '../utils/sync-replace';

import xrefCssComputed from './xref-csscomputed';
import xrefCssInherited from './xref-cssinherited';
import xrefCssInitials from './xref-cssinitial';

const localStrings = readJsonDependency('mdn-data', 'l10n/css.json');

const data = {
  atRules: readJsonDependency('mdn-data', 'css/at-rules.json'),
  // selectors: readJsonDependency('mdn-data', 'css/selectors.json'),
  // types: readJsonDependency('mdn-data', 'css/types.json'),
  properties: readJsonDependency('mdn-data', 'css/properties.json'),
  // syntaxes: readJsonDependency('mdn-data', 'css/syntaxes.json'),
  // units: readJsonDependency('mdn-data', 'css/units.json'),
};
/*
    Appends information about to which pseudo-elements a CSS property applies to
    the output to which normal elements it applies

    output - Current value output
    property - CSS info item name
    cssInfo - Structure containing information about a CSS property
  */
function addAdditionalAppliesToOutput(output, property, cssInfoData) {
  if (
    property !== 'appliesto' ||
    !Object.hasOwn(cssInfoData, 'alsoAppliesTo')
  ) {
    return output;
  }

  let additionalApplies = '';
  // Remove '::placeholder' from array to avoid displaying it,
  // because it's not standardized yet
  const placeholderIndex = cssInfoData.alsoAppliesTo.indexOf('::placeholder');
  if (placeholderIndex !== -1) {
    cssInfoData.alsoAppliesTo.splice(placeholderIndex, 1);
  }

  // In case there are no items left, the output is returned unchanged
  if (cssInfoData.alsoAppliesTo.length === 0) {
    return output;
  }
  for (let index = 0; index < cssInfoData.alsoAppliesTo.length; index += 1) {
    const element = cssInfoData.alsoAppliesTo[index];
    additionalApplies += `{{cssxref("${element}")}}`;

    if (index < cssInfoData.alsoAppliesTo.length - 2) {
      additionalApplies += ', ';
    } else if (index < cssInfoData.alsoAppliesTo.length - 1) {
      additionalApplies += ' і ';
    }
  }

  return replacePlaceholders('$1$. Також застосовується до $2$.', [
    output,
    additionalApplies,
  ]);
}
function cssInfo(termName, initialAtRule) {
  const {
    env: { slug, targetLocale },
    registry,
  } = this;

  const name =
    termName ||
    (slug ? slug.split('/').pop().toLowerCase() : 'preview-wiki-content');
  let atRule = initialAtRule;

  const formattedError = '<span style="color:red;">$1$</span>';

  /*
    Creates a link to another API, e.g. a CSS property or SVG element

    This function is used as a workaround for not being able to call other
    templates like 'cssxref' from within functions (see https://bugzil.la/939214)

    apiName - Name of the API to link to
    area - Area of the API (i.e. CSS, SVG, etc.)
    linkName - String to use as link label
  */
  function createLink(apiName, area, linkName) {
    let formattedLinkName = linkName || apiName;
    const url = `Web/${area || 'CSS'}/${apiName}`;

    const thisPage = registry.getPageBySlug(url);

    if (thisPage.tags.includes('CSS Function')) {
      formattedLinkName += '()';
    } else if (
      thisPage.tags.includes('CSS Data Type') ||
      thisPage.tags.includes('Element')
    ) {
      formattedLinkName = `&lt;${formattedLinkName}&gt;`;
    }

    return `<a href="/${targetLocale}/docs/${slug}"><code>${formattedLinkName}</code></a>`;
  }

  /*
    Parses all macros within a string
    s - String to parse
  */
  function parseMacros(s) {
    if (s === undefined) {
      return;
    }

    let area = '';
    const parsedString = syncReplace(
      s,
      /{{(.+?)(?:\((.+?)\))?}}/g,
      (match, macroName, parametersString) => {
        const parameters = parametersString
          ? parametersString.split(/, ?/)
          : [];
        for (let index = 0; index < parameters.length; index += 1) {
          parameters[index] = parameters[index].toLowerCase().slice(1, -1);
        }
        let apiName = parameters.length > 0 ? parameters[0] : '';
        switch (macroName.toLowerCase()) {
          case 'xref_csslength': {
            apiName = 'length';
            area = 'CSS';
            break;
          }

          case 'xref_cssangle': {
            apiName = 'angle';
            area = 'CSS';
            break;
          }

          case 'svgelement': {
            area = 'SVG/Element';
            break;
          }

          default: {
            area = 'CSS';
          }
        }

        return createLink(apiName, area, parameters[1]);
      },
    );
    return parsedString;
  }

  /**
    Parses all macros within a string

    string - String to parse.
    Must be called as a macros
    as it calls macros itself
  */
  function getValueOutput(cssInfoData, property, atRuleName) {
    let output;
    if (property === 'relatedAtRule') {
      return `<a href="/${targetLocale}/docs/Web/CSS/${atRuleName}"><code>${atRuleName}</code></a>`;
    }

    const value = cssInfoData[property];
    if (typeof value === 'string') {
      if (property === 'animationType') {
        const animationTypeValues = value.split(' ');
        const parsedAnimationTypeValues = animationTypeValues.map(
          (animationTypeValue) => {
            let localizedString = getLocalString(
              localStrings,
              animationTypeValue,
              targetLocale,
            );
            if (animationTypeValue === 'lpc') {
              localizedString = replacePlaceholders(localizedString, [
                `<a href="/${targetLocale}/docs/Web/CSS/length#interpoliatsiia" title="Значення типу <length> у CSS інтерполюються як дійсні числа з рухомою комою.">length</a>`,
              ]);
            }
            return localizedString;
          },
        );

        return parseMacros(
          addAdditionalAppliesToOutput(
            parsedAnimationTypeValues.join(', '),
            property,
            cssInfoData,
          ),
        );
      }
      const propertyMatches = value.match(/^'(.+?)'$/);
      if (propertyMatches) {
        return this.callMacro(
          getValueOutput,
          data.properties[propertyMatches[1]],
          property,
        );
      }
      if (property === 'initial' && !Object.hasOwn(localStrings, value)) {
        return `<code>${value}</code>`;
      }
      const keywords = value.split(', ');
      const replacedKeywords = keywords.map((keyword) => {
        return getLocalString(localStrings, keyword, targetLocale);
      });

      output = addAdditionalAppliesToOutput(
        replacedKeywords.join(', '),
        property,
        cssInfoData,
      );
      return parseMacros(output);
    }
    if (Array.isArray(value)) {
      output = 'так як і всі інші властивості зі скорочення:<br/><ul>';
      for (const longhand of value) {
        output += `<li>{{cssxref("${longhand}")}}: ${
          Object.hasOwn(data.properties, longhand)
            ? this.callMacro(
                getValueOutput,
                data.properties[longhand],
                property,
              )
            : replacePlaceholders(formattedError, [
                'Значення не знайшлося в базі даних!',
              ])
        }</li>`;
      }
      output += '</ul>';

      return parseMacros(
        addAdditionalAppliesToOutput(output, property, cssInfoData),
      );
    }
    if (typeof value === 'object') {
      output = localString(value, targetLocale);

      return parseMacros(
        addAdditionalAppliesToOutput(output, property, cssInfoData),
      );
    }
    if (typeof value === 'boolean') {
      return value ? 'так' : 'ні';
    }
    if (typeof value === 'undefined') {
      return replacePlaceholders(formattedError, [
        'Значення не знайшлося в базі даних!',
      ]);
    }

    return parseMacros(value);
  }

  let cssInfoData = null;

  if (!atRule) {
    let matches = null;
    if (slug) {
      matches = slug.match(/\/CSS\/(@.+?)(?=\/)/);
    }

    if (matches) {
      [, atRule] = matches;
    }
  }

  if (name !== 'preview-wiki-content') {
    if (atRule) {
      if (data.atRules[atRule] && data.atRules[atRule].descriptors) {
        cssInfoData = data.atRules[atRule].descriptors[name];
      }
    } else if (data.properties[name]) {
      cssInfoData = data.properties[name];
    }
  }

  let result = '';

  if (name === 'preview-wiki-content') {
    result =
      '<span style="color:red;">Інформація CSS недоступна для попереднього перегляду</span>';
  } else if (cssInfoData) {
    result = '<table class="properties"><tbody>';
    let properties = [];
    if (atRule) {
      properties = properties.concat({
        name: 'relatedAtRule',
        label: `Пов'язані <a href="/${targetLocale}/docs/Web/CSS/At-rule">директиви</a>`,
      });
    }

    properties = properties.concat({
      name: 'initial',
      label: this.callMacro(xrefCssInitials),
    });

    if (!atRule) {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'appliesto',
      //   label: 'Застосовується до',
      // });
    }

    if (Object.hasOwn(cssInfoData, 'inherited')) {
      properties = properties.concat({
        name: 'inherited',
        label: this.callMacro(xrefCssInherited),
      });
    }

    if (cssInfoData.percentages !== 'no') {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'percentages',
      //   label: 'Довжину можна вказувати у відсотках',
      // });
    }

    properties = properties.concat({
      name: 'computed',
      label: this.callMacro(xrefCssComputed),
    });

    if (!atRule) {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'animationType',
      //   label: 'Тип анімації',
      // });
    }

    if (cssInfoData.stacking) {
      properties = properties.concat({
        name: 'stacking',
        label: `Створює <a href="/${targetLocale}/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context">контекст нагромадження</a>`,
      });
    }

    for (const property of properties) {
      result +=
        `<tr>` +
        `<th scope="row">${property.label}</th><td>${this.callMacro(
          getValueOutput,
          cssInfoData,
          property.name,
          atRule,
        )}</td>`;
    }
    result += '</tbody></table>';
  } else {
    result = replacePlaceholders(formattedError, [
      'Значення не знайшлося в базі даних!',
    ]);
  }

  return result;
}

export default cssInfo;
