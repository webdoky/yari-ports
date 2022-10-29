import data from 'mdn-data/css.js';

import cssxref from './cssxref.js';

/**
 * Searches all CSS properties in CSSData that are animated and lists them in columns
 * 
  @returns {string}
 */
export default function CssAnimatedProperties() {
  const animatedProps = [];
  // Go through all properties, and test if they are animated. If so, add them to
  // the animatedProps array.
  for (const property in data.properties) {
    if (Object.prototype.hasOwnProperty.call(data.properties, property)) {
      if (
        !['discrete', 'notAnimatable'].includes(
          data.properties[property].animationType
        )
      ) {
        animatedProps.push(property);
      }
    }
  }
  animatedProps.sort();
  // Build the output string
  const result = '<div class="index">\n  <ul>\n';
  for (const propIndex in animatedProps) {
    const prop = animatedProps[propIndex];
    if (result) {
      result += ' ';
    }
    result += '    <li>' + cssxref.call(this, prop) + '</li>\n';
  }
  result += '  </ul>\n</div>';
  return result;
}
