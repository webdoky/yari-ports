import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'specifications' should be present", (t) => {
  t.truthy(macros({}).lookup('specifications'));
});

test("Macros 'specifications' should generate markup according to given query", (t) => {
  const specifications = macros({
    env: { browserCompat: 'some.different.query' },
  }).lookup('specifications');
  t.snapshot(specifications('some.query'));
});

test("Macros 'specifications' should generate markup even without explicit query, if it is provided with the context", (t) => {
  const specifications = macros({
    env: { browserCompat: 'some.query' },
  }).lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should generate markup with browser-compatibility information", (t) => {
  const specifications = macros({
    env: { browserCompat: 'css.properties.display' },
  }).lookup('specifications');
  t.snapshot(specifications());
});
