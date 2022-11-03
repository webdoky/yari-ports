import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'cssxref' should be present", (t) => {
  t.truthy(testMacros().lookup('cssxref'));
});

test("Macros 'cssxref' should return a link with proper href and text caption", (t) => {
  const cssxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'CSSxRef'
  );
  t.snapshot(cssxref('url()'));
});

test("Macros 'cssxref' should generate special link for '&lt;color&gt;'", (t) => {
  const cssxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'CSSxRef'
  );
  t.snapshot(cssxref('&lt;color&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;flex&gt;'", (t) => {
  const cssxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'CSSxRef'
  );
  t.snapshot(cssxref('&lt;flex&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;position&gt;'", (t) => {
  const cssxref = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'CSSxRef'
  );
  t.snapshot(cssxref('&lt;position&gt;'));
});
