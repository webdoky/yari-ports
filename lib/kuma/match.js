const matchMacro = /{{([\w-]+)(?:\(([^{]+|.*{(?!{).*)\))?}}/g;
const matchArgument = /(?:"((?:\\"|[^"])+)")|(?:'([^']+)')|(\d+)|(''|"")/g;

const unescapeString = (string_) => string_.replaceAll('\\"', '"');

export const parseMacroArguments = (initialArgumentString) => {
  return Array.from(
    initialArgumentString.matchAll(matchArgument),
    // eslint-disable-next-line array-callback-return,consistent-return
    ([, string1, string2, number_, emptyString]) => {
      if (string1 || string2) {
        return unescapeString(string1 || string2);
      }
      if (number_) {
        return Number.parseInt(number_, 10);
      }
      if (emptyString) {
        return '';
      }
    },
  );
};

export const extractMacros = (content) =>
  Array.from(content.matchAll(matchMacro), (matchedValue) => {
    const [match, functionName, arguments_] = matchedValue;

    return {
      match,
      functionName,
      args: arguments_,
    };
  });
