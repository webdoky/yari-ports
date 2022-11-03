import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'domxref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('domxref'));

  t.timeout(200);
});

test("macros 'domxref' should return a link with proper href and text caption", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const domxref = kumaPorts.lookup('domxref');
  t.snapshot(domxref('HTMLInputElement'));

  t.timeout(200);
});

test("macros 'domxref' should accept title as a second argument", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const domxref = kumaPorts.lookup('domxref');
  t.snapshot(domxref('HTMLElement/input_event', 'input'));

  t.timeout(200);
});

test("macros 'domxref' should work with dots and slashes in parameters", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const domxref = kumaPorts.lookup('domxref');
  t.snapshot(domxref('console/table', 'console.table()'));

  t.timeout(200);
});

test("macros 'domxref' should translate dot in the term into slash in url", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const domxref = kumaPorts.lookup('domxref');
  t.snapshot(domxref('GlobalEventHandlers.onabort'));

  t.timeout(200);
});
