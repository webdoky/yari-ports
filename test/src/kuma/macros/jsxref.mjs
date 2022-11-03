import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'jsxref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('jsxref'));

  t.timeout(200);
});

test("macros 'jsxref' should return a link with proper href and text caption", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const jsxref = kumaPorts.lookup('JSxRef');
  t.snapshot(jsxref('Operators/yield', 'yield'));

  t.timeout(200);
});

test("macros 'jsxref' should work on arguments with asterisk", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const jsxref = kumaPorts.lookup('JSxRef');
  t.snapshot(jsxref('Operators/yield*', 'yield*'));

  t.timeout(200);
});
