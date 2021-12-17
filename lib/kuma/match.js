const matchMacro = /\{\{([\w-]+)(?:\(([^{]+|.*{(?!{).*)\))?\}\}/g;
const matchArgument = /(?:"((?:\\"|[^"])+)")|(?:'([^']+)')|(\d+)|(''|"")/g;

const unescapeString = (str) => str.replace(/\\"/g, '"');

const parseMacroArgs = (initialArgumentString) => {
  return [...initialArgumentString.matchAll(matchArgument)].map(
    ([, str1, str2, num, emptyStr]) => {
      if (str1 || str2) {
        return unescapeString(str1 || str2);
      } else if (num) {
        return parseInt(num);
      } else if (emptyStr) {
        return '';
      }
      return undefined;
    }
  );
};

const extractMacros = (content) =>
  [...content.matchAll(matchMacro)].map((matchedValue) => {
    const [match, functionName, args] = matchedValue;

    return {
      match,
      functionName,
      args,
    };
  });

module.exports = {
  parseMacroArgs,
  extractMacros,
};
