import test from 'ava';

import { extractMacros, parseMacroArguments } from '../../../lib/kuma/match';

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

test('extractMacros should recognize macros with curly brackets in arguments', (t) => {
  const input =
    '{{JSxRef("Operators/Destructuring_assignment", "{a, b} = {a:1, b:2}")}}';
  const result = extractMacros(input);
  t.is(result.length, 1);
  t.is(result[0].functionName, 'JSxRef');

  t.timeout(200);
});

test('parseMacroArguments should recognize all arguments', (t) => {
  const input = '"Some", "args", 0';
  const result = parseMacroArguments(input);
  t.is(result.length, 3);

  t.timeout(200);
});

test('parseMacroArguments should recognize strings in gouble quotes', (t) => {
  const input = '"Some", "args", 0';
  const result = parseMacroArguments(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArguments should recognize strings in single quotes', (t) => {
  const input = "'Some', 'args', 0";
  const result = parseMacroArguments(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArguments should recognize strings with quotes in mixed style', (t) => {
  const input = '\'Some\', "args", 0';
  const result = parseMacroArguments(input);
  t.is(result.length, 3);
  t.is(result[0], 'Some');
  t.is(result[1], 'args');

  t.timeout(200);
});

test('parseMacroArguments should recognize integer arguments', (t) => {
  const input = '\'Some\', "args", 0, 20';
  const result = parseMacroArguments(input);
  t.is(result.length, 4);
  t.is(result[2], 0);
  t.is(result[3], 20);

  t.timeout(200);
});

test('parseMacroArguments should recognize arguments with curly brackets', (t) => {
  const input = '"Operators/Object_initializer", "{}"';
  const result = parseMacroArguments(input);
  t.is(result.length, 2);
  t.is(result[0], 'Operators/Object_initializer');
  t.is(result[1], '{}');

  t.timeout(200);
});

test('parseMacroArguments should recognize arguments with escaped quotes', (t) => {
  const input = '"Strict_mode", "\\"use strict\\""';
  const result = parseMacroArguments(input);
  t.is(result.length, 2);
  t.is(result[0], 'Strict_mode');
  t.is(result[1], '"use strict"');

  t.timeout(200);
});
