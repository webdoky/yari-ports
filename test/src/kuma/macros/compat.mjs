import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'compat' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('compat'));
});

test("macros 'compat' should generate markup according to given query", (t) => {
  const kumaPorts = macros({});
  const compat = kumaPorts.lookup('compat');
  t.snapshot(compat('css.types.-moz-image-rect'));
});

test("macros 'compat' should generate links to webdoky", (t) => {
  const kumaPorts = macros({});
  const compat = kumaPorts.lookup('compat');
  t.snapshot(compat('javascript.builtins.Boolean'));
});
