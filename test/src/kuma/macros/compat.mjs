import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'compat' should be present", (t) => {
  t.truthy(macros({ env: {} }).lookup('compat'));
});

test("Macros 'compat' should generate markup according to given query", (t) => {
  const compat = macros({ env: {} }).lookup('compat');
  t.snapshot(compat('css.types.-moz-image-rect'));
});

test("Macros 'compat' should generate links to webdoky", (t) => {
  const compat = macros({ env: {} }).lookup('compat');
  t.snapshot(compat('javascript.builtins.Boolean'));
});

test("Macros 'compat' should generate links based on implicit query", (t) => {
  const compat = macros({
    env: { browserCompat: 'javascript.builtins.Number' },
  }).lookup('compat');
  t.snapshot(compat());
});
