const ORIGIN = 'https://webdoky.github.io';

/**
 * Embeds a live sample from a mdn.github.io GitHub page
 *
 * @param {string} relativeUrl The URL of webdoky.github.io page (relative)
 * @param {string | number=} iframeWidth The width of the iframe (optional)
 * @param {string | number=} iframeHeight The height of the iframe (optional)
 * @returns {string} Outer HTML of an embedding iframe
 *
 * @example {{EmbedGHLiveSample("canvas-raycaster", 900, 300)}}
 * @example {{EmbedGHLiveSample("css-examples/learn/tasks/grid/grid1.html", '100%', 700)}}
 */
function EmbedGhLiveSample(relativeUrl, iframeWidth, iframeHeight) {
  const url = `${ORIGIN}/${relativeUrl}`;
  return `<iframe ${iframeWidth ? `width=${iframeWidth}` : ''} ${
    iframeHeight ? `height=${iframeHeight}` : ''
  } src="${url}"></iframe>`;
}

export default EmbedGhLiveSample;
