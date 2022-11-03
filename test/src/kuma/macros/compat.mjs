import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'compat' should be present", (t) => {
  t.truthy(testMacros().lookup('compat'));
});

test("Macros 'compat' should generate markup according to given query", (t) => {
  const compat = testMacros().lookup('compat');
  t.snapshot(compat('css.types.-moz-image-rect'));
});

test("Macros 'compat' should generate links to webdoky", (t) => {
  const compat = testMacros().lookup('compat');
  t.snapshot(compat('javascript.builtins.Boolean'));
});
