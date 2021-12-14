import test from 'ava';
import { parseMacroArgs, extractMacros } from '../../../lib/kuma/match.js';

test('extractMacros should recognize macros without arguments', (t) => {
  const input = '{{dummyMacro}}';
  const result = extractMacros(input);
  t.is(result.length, 1);
  t.is(result[0].match, '{{dummyMacro}}');

  t.timeout(200);
});

test("extractMacros's result should contain matched value", (t) => {
  const input = '{{dummyMacro}}';
  const result = extractMacros(input);
  t.is(result[0].match, '{{dummyMacro}}');

  t.timeout(200);
});

test("extractMacros's result should contain recognized function name", (t) => {
  const input = '{{dummyMacro}}';
  const result = extractMacros(input);
  t.is(result[0].functionName, 'dummyMacro');

  t.timeout(200);
});

test('extractMacros should recognize multiple macros, if present', (t) => {
  const input = '{{dummyMacro1}}{{dummyMacro2}}';
  const result = extractMacros(input);
  t.is(result.length, 2);
  t.is(result[0].match, '{{dummyMacro1}}');
  t.is(result[1].match, '{{dummyMacro2}}');

  t.timeout(200);
});

test('extractMacros should recognize macros with arguments', (t) => {
  const input = '{{dummyMacro("Some", "args")}}';
  const result = extractMacros(input);
  t.is(result.length, 1);
  t.is(result[0].args, '"Some", "args"');

  t.timeout(200);
});

test('extractMacros should recognize macros with hyphens in the name', (t) => {
  const input = '{{Non-Standard_Inline}}';
  const result = extractMacros(input);
  t.is(result.length, 1);
  t.is(result[0].functionName, 'Non-Standard_Inline');

  t.timeout(200);
});

test('parseMacroArgs should recognize all arguments', (t) => {
  const input = '"Some", "args", 0';
  const result = parseMacroArgs(input);
  t.is(result.length, 3);

  t.timeout(200);
});

test('parseMacroArgs should recognize strings in gouble quotes', (t) => {
  const input = '"Some", "args", 0';
  const result = parseMacroArgs(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArgs should recognize strings in single quotes', (t) => {
  const input = "'Some', 'args', 0";
  const result = parseMacroArgs(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArgs should recognize strings with quotes in mixed style', (t) => {
  const input = '\'Some\', "args", 0';
  const result = parseMacroArgs(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArgs should recognize integer arguments', (t) => {
  const input = '\'Some\', "args", 0, 20';
  const result = parseMacroArgs(input);
  t.is(result.length, 4);
  t.is(result[2], 0);
  t.is(result[3], 20);

  t.timeout(200);
});
