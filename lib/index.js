import { macros, parseMacroArgs, extractMacros } from './kuma/index.js';
import popularitiesJson from '@mdn/yari/popularities.json' assert { type: 'json' };
import { asDefinitionList, isDefinitionList } from './kuma/utils/dl.js';

const markdownExport = {
  asDefinitionList,
  isDefinitionList,
};

const kuma = {
  macros,
  parseMacroArgs,
  extractMacros,
};

const yariPorts = { kuma, popularitiesJson, markdown: markdownExport };

export { kuma, popularitiesJson, markdownExport as markdown };

export default yariPorts;
