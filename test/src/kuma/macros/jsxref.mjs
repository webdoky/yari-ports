import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'jsxref' should be present", (t) => {
  t.truthy(testMacros().lookup('jsxref'));

  t.timeout(200);
});

test("Macros 'jsxref' should return a link with proper href and text caption", (t) => {
  const jsxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'JSxRef'
  );
  t.snapshot(jsxref('Operators/yield', 'yield'));

  t.timeout(200);
});

test("Macros 'jsxref' should work on arguments with asterisk", (t) => {
  const jsxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'JSxRef'
  );
  t.snapshot(jsxref('Operators/yield*', 'yield*'));

  t.timeout(200);
});
