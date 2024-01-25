/**
 * Links to a live sample given the ID of its header block.
 * @example {{LiveSampleLink('Full_IndexedDB_example', "Test the online live demo")}}
 *
 * @param {string} blockHeaderId
 * @param {string} linkLabel
 * @returns {string}
 */
export default function LiveSampleLink(blockHeaderId, linkLabel) {
  let { path } = this.env;
  // trim trailing slash
  path = path.replace(/\/$/, '');
  return `<a href="${path}/_sample_.${blockHeaderId}.html">${linkLabel}</a>`;
}
