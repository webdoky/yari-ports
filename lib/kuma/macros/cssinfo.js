const data = require('mdn-data/css');
const localStrings = require('mdn-data/l10n/css');
const {
  replacePlaceholders,
  getLocalString,
  localString,
} = require('@mdn/yari/kumascript/src/api/mdn');
const syncReplace = require('../utils/sync-replace');
const { default: xrefCssInitials } = require('./xref-cssinitial');
const { default: xrefCssInherited } = require('./xref-cssinherited');
const { default: xrefCssComputed } = require('./xref-csscomputed');

function cssInfo(termName, initialAtRule) {
  const { slug, targetLocale, registry } = this;

  let name =
    termName ||
    (slug ? slug.split('/').pop().toLowerCase() : 'preview-wiki-content');
  let atRule = initialAtRule;

  let formattedError = '<span style="color:red;">$1$</span>';
  let localize = getLocalString.bind({ env: { locale: targetLocale } });
  let localizeString = localString.bind({ env: { locale: targetLocale } });

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
    let url = 'Web/' + (area || 'CSS') + '/' + apiName;

    let thisPage = registry.getPageBySlug(url);

    if (thisPage.tags.includes('CSS Function')) {
      formattedLinkName += '()';
    } else if (
      thisPage.tags.includes('CSS Data Type') ||
      thisPage.tags.includes('Element')
    ) {
      formattedLinkName = '&lt;' + formattedLinkName + '&gt;';
    }

    return `<a href="/${targetLocale}/docs/${slug}"><code>${formattedLinkName}</code></a>`;
  }

  /*
    Parses all macros within a string
    s - String to parse
  */
  function parseMacros(s) {
    if (s === undefined) {
      return undefined;
    }

    var area = '';
    let parsedString = syncReplace(
      s,
      /\{\{(.+?)(?:\((.+?)\))?\}\}/g,
      function (match, macroName, paramsString) {
        var params = paramsString ? paramsString.split(/, ?/) : [];
        params.forEach(function (param, index, params) {
          params[index] = params[index].toLowerCase().slice(1, -1);
        });
        var apiName = params.length !== 0 ? params[0] : '';
        switch (macroName.toLowerCase()) {
          case 'xref_csslength':
            apiName = 'length';
            area = 'CSS';
            break;

          case 'xref_cssangle':
            apiName = 'angle';
            area = 'CSS';
            break;

          case 'svgelement':
            area = 'SVG/Element';
            break;

          default:
            area = 'CSS';
        }

        return createLink(apiName, area, params[1]);
      }
    );
    return parsedString;
  }

  /*
    Appends information about to which pseudo-elements a CSS property applies to
    the output to which normal elements it applies
  
    output - Current value output
    property - CSS info item name
    cssInfo - Structure containing information about a CSS property
  */
  function addAdditionalAppliesToOutput(output, property, cssInfo) {
    if (
      property !== 'appliesto' ||
      !Object.prototype.hasOwnProperty.call(cssInfo, 'alsoAppliesTo')
    ) {
      return output;
    }

    var additionalApplies = '';
    // Remove '::placeholder' from array to avoid displaying it,
    // because it's not standardized yet
    var placeholderIndex = cssInfo.alsoAppliesTo.indexOf('::placeholder');
    if (placeholderIndex !== -1) {
      cssInfo.alsoAppliesTo.splice(placeholderIndex, 1);
    }

    // In case there are no items left, the output is returned unchanged
    if (cssInfo.alsoAppliesTo.length === 0) {
      return output;
    }

    cssInfo.alsoAppliesTo.forEach(function (element, index, elements) {
      additionalApplies += '{{cssxref("' + element + '")}}';

      if (index < elements.length - 2) {
        additionalApplies += ', ';
      } else if (index < elements.length - 1) {
        additionalApplies += ' і ';
      }
    });

    return replacePlaceholders('$1$. Також застосовується до $2$.', [
      output,
      additionalApplies,
    ]);
  }

  /*
    Parses all macros within a string
  
    string - String to parse
  */
  function getValueOutput(cssInfo, property, atRule) {
    if (property === 'relatedAtRule') {
      return (
        '<a href="/' +
        targetLocale +
        '/docs/Web/CSS/' +
        atRule +
        '"><code>' +
        atRule +
        '</code></a>'
      );
    }

    var value = cssInfo[property];
    if (typeof value === 'string') {
      if (property === 'animationType') {
        var animationTypeValues = value.split(' ');
        var parsedAnimationTypeValues = animationTypeValues.map(function (
          animationTypeValue
        ) {
          var localizedString = localize(localStrings, animationTypeValue);
          if (animationTypeValue === 'lpc') {
            localizedString = replacePlaceholders(localizedString, [
              `<a href="/${targetLocale}/docs/Web/CSS/length#Interpolation" title="Значення типу <length> в CSS інтерполюються як дійсні числа з рухомою комою.">length</a>`,
            ]);
          }
          return localizedString;
        });

        return parseMacros(
          addAdditionalAppliesToOutput(
            parsedAnimationTypeValues.join(', '),
            property,
            cssInfo
          )
        );
      } else {
        var propMatches = value.match(/^'(.+?)'$/);
        if (propMatches) {
          return getValueOutput(data.properties[propMatches[1]], property);
        } else {
          if (
            property === 'initial' &&
            !Object.prototype.hasOwnProperty.call(localStrings, value)
          ) {
            return '<code>' + value + '</code>';
          } else {
            var keywords = value.split(', ');
            var replacedKeywords = keywords.map(function (keyword) {
              return localize(localStrings, keyword);
            });

            var output = addAdditionalAppliesToOutput(
              replacedKeywords.join(', '),
              property,
              cssInfo
            );
            return parseMacros(output);
          }
        }
      }
    } else if (Array.isArray(value)) {
      var output =
        'так як і всі інші властивості зі скорочення:' + '<br/>' + '<ul>';
      for (let longhand of value) {
        output +=
          '<li>{{cssxref("' +
          longhand +
          '")}}: ' +
          (Object.prototype.hasOwnProperty.call(data.properties, longhand)
            ? getValueOutput(data.properties[longhand], property)
            : replacePlaceholders(formattedError, [
                'Значення не знайшлося в базі даних!',
              ])) +
          '</li>';
      }
      output += '</ul>';

      return parseMacros(
        addAdditionalAppliesToOutput(output, property, cssInfo)
      );
    } else if (typeof value === 'object') {
      var output = localizeString(value);

      return parseMacros(
        addAdditionalAppliesToOutput(output, property, cssInfo)
      );
    } else if (typeof value === 'boolean') {
      return value ? 'так' : 'ні';
    } else if (typeof value === 'undefined') {
      return replacePlaceholders(formattedError, [
        'Значення не знайшлося в базі даних!',
      ]);
    }

    return parseMacros(value);
  }

  var cssInfo = null;

  if (!atRule) {
    var matches = null;
    if (slug) {
      matches = slug.match(/\/CSS\/(@.+?)(?=\/)/);
    }

    if (matches) {
      atRule = matches[1];
    }
  }

  if (name !== 'preview-wiki-content') {
    if (atRule) {
      if (data.atRules[atRule] && data.atRules[atRule].descriptors) {
        cssInfo = data.atRules[atRule].descriptors[name];
      }
    } else if (data.properties[name]) {
      cssInfo = data.properties[name];
    }
  }

  var result = '';

  if (name === 'preview-wiki-content') {
    result =
      '<span style="color:red;">Інформація CSS недоступна для попереднього перегляду</span>';
  } else if (cssInfo) {
    result = '<table class="properties">' + '<tbody>';
    var properties = [];
    if (atRule) {
      properties = properties.concat({
        name: 'relatedAtRule',
        label: `Пов'язані <a href="/${targetLocale}/docs/Web/CSS/At-rule">директиви</a>`,
      });
    }

    properties = properties.concat({
      name: 'initial',
      label: xrefCssInitials.call(this),
    });

    if (!atRule) {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'appliesto',
      //   label: 'Застосовується до',
      // });
    }

    if (Object.prototype.hasOwnProperty.call(cssInfo, 'inherited')) {
      properties = properties.concat({
        name: 'inherited',
        label: xrefCssInherited.call(this),
      });
    }

    if (cssInfo.percentages !== 'no') {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'percentages',
      //   label: 'Довжину можна вказувати у відсотках',
      // });
    }

    properties = properties.concat({
      name: 'computed',
      label: xrefCssComputed.call(this),
    });

    if (!atRule) {
      // TODO: translate related resources
      // properties = properties.concat({
      //   name: 'animationType',
      //   label: 'Тип анімації',
      // });
    }

    if (cssInfo.stacking) {
      properties = properties.concat({
        name: 'stacking',
        label: `Створює <a href="/${targetLocale}/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context">контекст нагромадження</a>`,
      });
    }

    for (let property of properties) {
      result +=
        '<tr>' +
        '<th scope="row">' +
        property.label +
        '</th><td>' +
        getValueOutput(cssInfo, property.name, atRule) +
        '</td>';
    }
    result += '</tbody>' + '</table>';
  } else {
    result = replacePlaceholders(formattedError, [
      'Значення не знайшлося в базі даних!',
    ]);
  }

  return result;
}

module.exports.default = cssInfo;
