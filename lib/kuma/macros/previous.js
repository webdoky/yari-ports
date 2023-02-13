import previousNext from './previous-next';

/**
 * Calls PreviousNext to avoid duplication of translations
 * @param {string=} previousPath path of Previous page
 * @returns {string}
 */
export default function previous(previousPath) {
  return previousNext(previousPath);
}
