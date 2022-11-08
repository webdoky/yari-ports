import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'jsxref' should be present", (t) => {
  t.truthy(macros({}).lookup('jsxref'));

  t.timeout(200);
});

test("Macros 'jsxref' should return a link with proper href and text caption", (t) => {
  const jsxref = macros({ env: { targetLocale: 'en-US' } }).lookup('JSxRef');
  t.snapshot(jsxref('Operators/yield', 'yield'));

  t.timeout(200);
});

test("Macros 'jsxref' should work on arguments with asterisk", (t) => {
  const jsxref = macros({ env: { targetLocale: 'en-US' } }).lookup('JSxRef');
  t.snapshot(jsxref('Operators/yield*', 'yield*'));

  t.timeout(200);
});
