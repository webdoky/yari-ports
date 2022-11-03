import { readFileSync } from 'fs';

/**
 *
 * @param {string} jsonPackagePath Path to a JSON file in node_modules
 * @returns {unknown} Data from JSON file
 * @example readJsonDependency('@mdn/browser-compat-data/data.json')
 */
export default function readJsonDependency(jsonPackagePath) {
  return JSON.parse(readFileSync(import.meta.resolve(jsonPackagePath)));
}
