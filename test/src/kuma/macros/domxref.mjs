import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'domxref' should be present", (t) => {
  t.truthy(testMacros().lookup('domxref'));

  t.timeout(200);
});

test("Macros 'domxref' should return a link with proper href and text caption", (t) => {
  const domxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'domxref'
  );
  t.snapshot(domxref('HTMLInputElement'));

  t.timeout(200);
});

test("Macros 'domxref' should accept title as a second argument", (t) => {
  const domxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'domxref'
  );
  t.snapshot(domxref('HTMLElement/input_event', 'input'));

  t.timeout(200);
});

test("Macros 'domxref' should work with dots and slashes in parameters", (t) => {
  const domxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'domxref'
  );
  t.snapshot(domxref('console/table', 'console.table()'));

  t.timeout(200);
});

test("Macros 'domxref' should translate dot in the term into slash in url", (t) => {
  const domxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'domxref'
  );
  t.snapshot(domxref('GlobalEventHandlers.onabort'));

  t.timeout(200);
});
