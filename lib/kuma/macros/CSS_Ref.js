import data from 'mdn-data/css';

import htmlEscape from '../utils/html-escape';

function normalize(string_) {
  return string_
    .replace(/ \(@[\w-]+\)$/, '')
    .replace(/@[\w-]+\/|[^\d()a-z-]/gi, '');
}
function compareItems(itemA, itemB) {
  const normalizedItemA = normalize(itemA.label);
  const normalizedItemB = normalize(itemB.label);
  if (normalizedItemA === normalizedItemB) {
    if (itemA.label === itemB.label) {
      return 0;
    }

    return itemA.label > itemB.label ? 1 : -1;
  }

  return normalizedItemA > normalizedItemB ? 1 : -1;
}
function getItemsFromSyntax(syntax) {
  const items = syntax.match(/[\w-]+\([\w #*+,<>?[\]|-]*\)|@[\w-]+/g) || [];
  for (let index = 0; index < items.length; index += 1) {
    // Remove parameters
    items[index] = items[index].replace(/\(.*?\)/, '()');
  }
  return items;
}

/**
 * Inserts an index of all CSS properties, selectors, types, functions and at-rules plus their descriptors.
 *
 * @param {string} typesJson Array of strings used to filter the displayed items by type
       (valid values: 'properties', 'selectors', 'types', 'functions',
       'at-rules', 'descriptors'; defaults to showing all)
 * @param {'alphabetically' | 'no' | undefined} groupingTypeParameter Item grouping type
       (valid values: 'alphabetically', 'no'; defaults to 'alphabetically')
 * @param {string} outputStatusesJson Array of strings used to filter the items by their status
       (valid values: 'standard', 'experimental', "nonstandard';
       defaults to ['standard', 'experimental'])
 * @returns {string}
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export default function CSS_Ref(
  typesJson,
  groupingTypeParameter,
  outputStatusesJson,
) {
  const types = new Set(
    typesJson
      ? JSON.parse(typesJson)
      : [
          'properties',
          'selectors',
          'types',
          'syntaxes',
          'at-rules',
          'descriptors',
          'units',
        ],
  );
  const groupingType =
    groupingTypeParameter === 'category' || groupingTypeParameter === 'no'
      ? groupingTypeParameter
      : 'alphabetically';
  const outputStatuses = new Set(
    outputStatusesJson
      ? JSON.parse(outputStatusesJson)
      : ['standard', 'experimental'],
  );
  const { targetLocale } = this.env;
  const index = {};

  if (types.has('properties')) {
    // Add properties to index
    for (const [propertyName, propertyData] of Object.entries(
      data.properties || {},
    )) {
      // Exclude properties that don't have the right status
      if (!outputStatuses.has(propertyData.status)) {
        continue;
      }

      const initial = propertyName[0].toUpperCase();

      if (!Object.hasOwn(index, initial)) {
        index[initial] = [];
      }

      index[initial].push({
        urlPath: propertyName,
        label: propertyName,
      });
    }
  }

  if (types.has('types')) {
    // Add types to index
    for (const [typeName, typeData] of Object.entries(data.types || {})) {
      // Exclude types that don't have the right status
      if (!outputStatuses.has(typeData.status)) {
        continue;
      }

      let normalizedType = normalize(typeName);
      const initial = normalizedType[0].toUpperCase();

      if (!Object.hasOwn(index, initial)) {
        index[initial] = [];
      }

      let label = typeName;
      if (label.charAt(0) !== '<') {
        // https://github.com/mdn/data/pull/81 was merged
        label = `<${typeName}>`;
      }

      // Generate URL path regarding some special cases
      switch (normalizedType) {
        case 'color': {
          normalizedType = 'color_value';
          break;
        }

        case 'flex': {
          normalizedType = 'flex_value';
          break;
        }

        case 'position': {
          normalizedType = 'position_value';
          break;
        }
        default:
      }

      index[initial].push({
        urlPath: normalizedType,
        label,
      });
    }
  }

  if (types.has('syntaxes')) {
    // Add value syntaxes to index

    const { syntaxes } = data;
    for (const [syntaxName, syntaxData] of Object.entries(syntaxes || {})) {
      if (/\(\)$/.test(syntaxName)) {
        const initial = normalize(syntaxName)[0].toUpperCase();

        if (!Object.hasOwn(index, initial)) {
          index[initial] = [];
        }

        index[initial].push({
          urlPath: syntaxName.replace('()', ''),
          label: syntaxName,
        });
      }

      // Add items within at-rule syntax (e.g. "@annotation")
      // check whether https://github.com/mdn/data/pull/66 was merged
      const items = getItemsFromSyntax(syntaxData.syntax || syntaxData);

      for (const item of items) {
        if (syntaxes[item] && !outputStatuses.has(syntaxes[item])) {
          continue;
        }

        const initial = normalize(item)[0].toUpperCase();

        if (!Object.hasOwn(index, initial)) {
          index[initial] = [];
        }

        index[initial].push({
          urlPath: item.replace('()', ''),
          label: item,
        });
      }
    }
  }

  if (types.has('at-rules')) {
    // Add at-rules to index
    for (const [atRuleName, atRuleData] of Object.entries(data.atRules || {})) {
      // Exclude at-rules that don't have the right status
      if (!outputStatuses.has(atRuleData.status)) {
        continue;
      }

      const initial = normalize(atRuleName)[0].toUpperCase();

      if (!Object.hasOwn(index, initial)) {
        index[initial] = [];
      }

      index[initial].push({
        urlPath: atRuleName,
        label: atRuleName,
      });

      // Add items within at-rule syntax
      if (atRuleData.syntax) {
        const items = getItemsFromSyntax(atRuleData.syntax);

        for (const item of items) {
          // Exclude the at-rule itself when its inside the syntax
          if (item === atRuleName) {
            continue;
          }

          const otherInitial = normalize(item)[0].toUpperCase();

          if (!Object.hasOwn(index, otherInitial)) {
            index[otherInitial] = [];
          }

          index[otherInitial].push({
            urlPath: `${atRuleName}/${item}`,
            label: `${item} (${atRuleName})`,
          });
        }
      }

      if (types.has('descriptors')) {
        // Add the at-rule's descriptors
        for (const [descriptorName, descriptorData] of Object.entries(
          atRuleData.descriptors || {},
        )) {
          // Exclude descriptors that don't have the right status
          if (!outputStatuses.has(descriptorData.status)) {
            continue;
          }

          const otherInitial = descriptorName[0].toUpperCase();

          if (!Object.hasOwn(index, otherInitial)) {
            index[otherInitial] = [];
          }

          index[otherInitial].push({
            urlPath: `${atRuleName}/${descriptorName}`,
            label: `${descriptorName} (${atRuleName})`,
          });

          // Add items within descriptor syntax
          const items = getItemsFromSyntax(descriptorData.syntax);

          for (const item of items) {
            const anotherInitial = normalize(item)[0].toUpperCase();

            if (!Object.hasOwn(index, anotherInitial)) {
              index[anotherInitial] = [];
            }

            index[anotherInitial].push({
              urlPath: `${atRuleName}/${descriptorName}#${item}`,
              label: item,
            });
          }
        }
      }
    }
  }

  if (types.has('selectors')) {
    // Add selectors to index
    for (const [selectorName, selectorData] of Object.entries(
      data.selectors || {},
    )) {
      // Exclude selectors that don't have the right status
      if (!outputStatuses.has(selectorData.status)) {
        continue;
      }

      // Exclude basic selectors
      if (selectorName.includes(' ')) {
        continue;
      }

      const initial = normalize(selectorName)[0].toUpperCase();

      if (!Object.hasOwn(index, initial)) {
        index[initial] = [];
      }

      index[initial].push({
        urlPath: selectorName,
        label: selectorName,
      });
    }
  }

  if (types.has('units')) {
    // Add units to index
    for (const unitTuple of Object.entries(data.units || {})) {
      let [unitName] = unitTuple;
      const [, unitData] = unitTuple;
      // Exclude units that don't have the right status
      if (!outputStatuses.has(unitData.status)) {
        continue;
      }

      const initial = unitName[0].toUpperCase();

      if (!Object.hasOwn(index, initial)) {
        index[initial] = [];
      }

      switch (unitData.groups[1]) {
        case 'CSS Lengths': {
          unitName = `length#${unitName}`;
          break;
        }

        case 'CSS Angles': {
          unitName = `angle#${unitName}`;
          break;
        }

        case 'CSS Flexible Lengths': {
          unitName = `flex_value#${unitName}`;
          break;
        }

        case 'CSS Frequencies': {
          unitName = `frequency#${unitName}`;
          break;
        }

        case 'CSS Times': {
          unitName = `time#${unitName}`;
          break;
        }

        case 'CSS Resolutions': {
          unitName = `resolution#${unitName}`;
          break;
        }
        default:
      }

      index[initial].push({
        urlPath: unitName,
        label: unitName,
      });
    }
  }

  const characters = Object.keys(index).sort();

  // Add missing items
  if (types.has('types')) {
    if (!index.C) {
      index.C = [];
    }
    index.C.push({
      urlPath: 'counter',
      label: '<counter>',
    });

    index.U.push({
      urlPath: 'url#funktsiinyi-zapys-url',
      label: 'url()',
    });
  }

  if (types.has('syntaxes')) {
    if (!index.I) {
      index.I = [];
    }
    index.I.push(
      {
        urlPath: 'inherit',
        label: 'inherit',
      },
      {
        urlPath: 'initial',
        label: 'initial',
      },
    );
    if (!index.R) {
      index.R = [];
    }
    index.R.push({
      urlPath: 'revert',
      label: 'revert',
    });
    if (!index.U) {
      index.U = [];
    }
    index.U.push({
      urlPath: 'unset',
      label: 'unset',
    });

    if (!index.V) {
      index.V = [];
    }
    index.V.push({
      urlPath: 'var',
      label: 'var()',
    });
  }

  if (types.has('properties')) {
    index['Інші'] = [
      {
        urlPath: '--*',
        label: '--*',
      },
    ];
    characters.push('Інші');
  }

  // Adjust data for output
  for (const character of characters) {
    for (
      let characterIndex = index[character].length - 1;
      characterIndex >= 0;
      characterIndex -= 1
    ) {
      const item = index[character][characterIndex];

      switch (item.label) {
        case '::after':
        case '::before':
        case '::first-letter':
        case '::first-line': {
          item.label += ` (${item.label.replace(/^:/, '')})`;
          break;
        }

        case '@annotation':
        case '@character-variant':
        case '@ornaments':
        case '@styleset':
        case '@stylistic':
        case '@swash': {
          item.urlPath = `@font-feature-values#${item.label}`;
          break;
        }

        case 'annotation()':
        case 'character-variant()':
        case 'ornaments()':
        case 'styleset()':
        case 'stylistic()':
        case 'swash()': {
          item.urlPath = `font-variant-alternates#${item.label}`;
          break;
        }

        case 'format()': {
          item.urlPath = '@font-face/src#format()';
          break;
        }

        case 'image()': {
          item.urlPath = 'image#funktsiinyi-zapys-image';
          break;
        }

        case 'url()': {
          item.urlPath = 'url#funktsiinyi-zapys-url';
          break;
        }

        case 'blur()':
        case 'brightness()':
        case 'contrast()':
        case 'drop-shadow()':
        case 'grayscale()':
        case 'hue-rotate()':
        case 'invert()':
        case 'opacity()':
        case 'saturate()':
        case 'sepia()': {
          item.urlPath = `filter-function/${item.label.replace('()', '')}`;
          break;
        }

        case 'matrix()':
        case 'matrix3d()':
        case 'perspective()':
        case 'rotate()':
        case 'rotate3d()':
        case 'rotateX()':
        case 'rotateY()':
        case 'rotateZ()':
        case 'scale()':
        case 'scale3d()':
        case 'scaleX()':
        case 'scaleY()':
        case 'scaleZ()':
        case 'skew()':
        case 'skewX()':
        case 'skewY()':
        case 'translate()':
        case 'translate3d()':
        case 'translateX()':
        case 'translateY()':
        case 'translateZ()': {
          item.urlPath = `transform-function/${item.label.replace('()', '')}`;
          break;
        }

        case 'rgb()':
        case 'rgba()':
        case 'hsl()':
        case 'hsla()': {
          item.urlPath = `color_value#${item.label}`;
          break;
        }

        case 'inset()':
        case 'polygon()':
        case 'circle()':
        case 'ellipse()': {
          item.urlPath = `basic-shape#${item.label}`;
          break;
        }

        case 'rect()': {
          item.urlPath = `shape#${item.label}`;
          break;
        }

        case '@top-left-corner':
        case '@top-left':
        case '@top-center':
        case '@top-right':
        case '@top-right-corner':
        case '@bottom-left-corner':
        case '@bottom-left':
        case '@bottom-center':
        case '@bottom-right':
        case '@bottom-right-corner':
        case '@left-top':
        case '@left-middle':
        case '@left-bottom':
        case '@right-top':
        case '@right-middle':
        case '@right-bottom': {
          item.urlPath = '@page#page-margin-box-type';
          break;
        }

        case 'cubic-bezier()':
        case 'frames()':
        case 'steps()': {
          item.urlPath = `single-transition-timing-function#${item.label}`;
          break;
        }
        default:
      }
    }
  }

  // Removed duplicates
  for (const character of characters) {
    index[character].sort(compareItems);

    for (
      let nestedIndex = index[character].length - 1;
      nestedIndex >= 0;
      nestedIndex -= 1
    ) {
      const item = index[character][nestedIndex];

      if (
        nestedIndex !== 0 &&
        item.urlPath === index[character][nestedIndex - 1].urlPath
      ) {
        index[character].splice(nestedIndex, 1);
      }
    }
  }

  let output = '';

  if (groupingType === 'no') {
    output = '<ul>';
  }

  const baseURL = `/${targetLocale}/docs/Web/CSS/`;

  for (const character of characters) {
    if (groupingType === 'alphabetically') {
      output += `<h3>${character}</h3>`;
      output += '<ul>';
    }

    for (
      let characterIndex = 0;
      characterIndex < index[character].length;
      characterIndex += 1
    ) {
      const url = baseURL + index[character][characterIndex].urlPath;
      output += `<li><a href="${url}">${htmlEscape(
        index[character][characterIndex].label,
      )}</a></li>`;
    }

    if (groupingType === 'alphabetically') {
      output += '</ul>';
    }
  }

  if (groupingType === 'no') {
    output += '</ul>';
  }
  return `<div class="index">${output}</div>`;
}
