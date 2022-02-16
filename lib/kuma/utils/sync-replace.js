function syncReplace(source, pattern, replacer) {
  // Find all the matches, replace with "", and discard the result
  const matches = [];
  source.replace(pattern, (...match) => {
    matches.push(match);
    return '';
  });

  // Now loop through those matches and create an array of alternating
  // string and Promise<string> elements corresponding to the unreplaced
  // parts of the source string and the async replacements for the
  // replaced parts
  const parts = [];
  let lastMatchEnd = 0;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const matchIndex = match[match.length - 2];
    // Add any text before the first match to the parts array
    if (matchIndex > lastMatchEnd) {
      parts.push(source.substring(lastMatchEnd, matchIndex));
    }
    lastMatchEnd = matchIndex + match[0].length;

    // Now push a promise on the stack for this match.
    // Note that we don't await it now; we'll do that with
    // Promise.all(). Note that if the replace function isn't
    // actually async and just returns a string, that is okay, too.
    parts.push(replacer(...match));
  }
  // If there is any non-matched text at the end of the strings, add
  // that to the parts array as well
  if (lastMatchEnd < source.length) {
    parts.push(source.substring(lastMatchEnd));
  }

  // Join it all together and return it
  return parts.join('');
}

module.exports = syncReplace;
