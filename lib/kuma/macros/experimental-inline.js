import ExperimentalBadge from './experimental-badge';

/**
 * Inserts an "experimental" icon. This just calls through to the newer
 * ExperimentalBadge macro, which you should use instead.
 * @returns {string}
 */
export default function ExperimentalInline() {
  return this.callMacro(ExperimentalBadge);
}
