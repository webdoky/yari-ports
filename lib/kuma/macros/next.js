import previousNext from './previous-next';

/**
 * Calls PreviousNext to avoid duplication of translations
 *
 * @param {string=} nextPath path of Next page
 * @returns {string}
 */
export default function next(nextPath) {
  return previousNext(null, nextPath);
}
