import { readFileSync } from 'fs';
import resolvePackagePath from 'resolve-package-path';
import process from 'process';

import buildResolver from 'esm-resolve';


/**
 *
 * @param {string} moduleName Module name, containing the desired file
 * @param {string} filePath Path to a JSON file in that module
 * @returns {unknown} Data from JSON file
 * @example readJsonDependency('@mdn/browser-compat-data', 'data.json')
 */
export default function readJsonDependency(moduleName, filePath) {
  const basePathWithPackageJson = resolvePackagePath(moduleName, process.cwd());
  if (!basePathWithPackageJson) {
    throw new Error(`Could not resolve module ${moduleName}`)
  }
  const basePath = basePathWithPackageJson.slice(0, basePathWithPackageJson.length - 'package.json'.length)

  let normalizedFilePath = filePath;

  if (normalizedFilePath.endsWith('/')) {
    normalizedFilePath = normalizedFilePath.slice(1);
  }

  return JSON.parse(readFileSync(`${basePath}${normalizedFilePath}`));
}
