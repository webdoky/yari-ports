import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'ariarole' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('ariarole'));

  t.timeout(200);
});

test("Macros 'ariarole' should generate links to W3C spec", (t) => {
  const kumaPorts = macros({});
  const ariarole = kumaPorts.lookup('ariarole');
  t.snapshot(ariarole('spinbutton'));

  t.timeout(200);
});