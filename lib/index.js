import { asDefinitionList, isDefinitionList } from './kuma/utils/dl';
import { extractMacros, macros, parseMacroArguments } from './kuma';
import readJsonDependency from './read-json-dependency';

const popularitiesJson = readJsonDependency('@mdn/yari/popularities.json');

const markdownExport = {
  asDefinitionList,
  isDefinitionList,
};

const kuma = {
  macros,
  parseMacroArgs: parseMacroArguments,
  extractMacros,
};

const yariPorts = { kuma, popularitiesJson, markdown: markdownExport };

export { kuma, markdownExport as markdown, popularitiesJson };

export default yariPorts;
