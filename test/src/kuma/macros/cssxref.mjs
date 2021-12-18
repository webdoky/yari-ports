import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'cssxref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('cssxref'));
});

test("Macros 'cssxref' should return a link with proper href and text caption", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const cssxref = kumaPorts.lookup('CSSxRef');
  t.snapshot(cssxref('url()'));
});

test("Macros 'cssxref' should generate special link for '&lt;color&gt;'", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const cssxref = kumaPorts.lookup('CSSxRef');
  t.snapshot(cssxref('&lt;color&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;flex&gt;'", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const cssxref = kumaPorts.lookup('CSSxRef');
  t.snapshot(cssxref('&lt;flex&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;position&gt;'", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const cssxref = kumaPorts.lookup('CSSxRef');
  t.snapshot(cssxref('&lt;position&gt;'));
});
