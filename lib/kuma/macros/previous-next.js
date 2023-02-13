const s_PreviousNext = ['« Попередня стаття', 'Наступна стаття  »'];

/**
 *
 * @param {string=} previousPath path of Previous page
 * @param {string=} nextPath path of Next page
 * @returns {string} Previous & next links
 *
 * Problem of Apostrophe (https://developer.mozilla.org/fr/docs/JavaScript_Guide/Op%C3%A9rateurs/Op%C3%A9rateurs_sp%C3%A9ciaux)
 */
export default function previousNext(previousPath, nextPath) {
  let stringPrevious = '';
  let stringNext = '';
  if (previousPath) {
    stringPrevious = `<li><a class="button minimal" href="/uk/docs/${previousPath.replaceAll(
      ' ',
      '_',
    )}">${s_PreviousNext[0]}</a></li>`;
  }
  if (nextPath) {
    stringNext = `<li><a class="button minimal" href="/uk/docs/${nextPath.replaceAll(
      ' ',
      '_',
    )}">${s_PreviousNext[1]}</a></li>`;
  }

  return `<ul class="prev-next">
    ${stringPrevious}
    ${stringNext}
</ul>`;
}
