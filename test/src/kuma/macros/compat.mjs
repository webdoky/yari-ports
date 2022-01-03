import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'compat' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('compat'));
});

test("Macros 'compat' should generate markup according to given query", (t) => {
  const kumaPorts = macros({});
  const compat = kumaPorts.lookup('compat');
  t.snapshot(compat('css.types.-moz-image-rect'));
});

test("Macros 'compat' should generate links to webdoky", (t) => {
  const kumaPorts = macros({});
  const compat = kumaPorts.lookup('compat');
  t.snapshot(compat('javascript.builtins.Boolean'));
});
