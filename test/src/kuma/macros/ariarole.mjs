import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'ariarole' should be present", (t) => {
  t.truthy(macros({}).lookup('ariarole'));

  t.timeout(200);
});

test("Macros 'ariarole' should generate links to W3C spec", (t) => {
  const ariarole = macros({}).lookup('ariarole');
  t.snapshot(ariarole('spinbutton'));

  t.timeout(200);
});
