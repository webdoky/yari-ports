import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'ariarole' should be present", (t) => {
  t.truthy(testMacros().lookup('ariarole'));

  t.timeout(200);
});

test("Macros 'ariarole' should generate links to W3C spec", (t) => {
  const ariarole = testMacros().lookup('ariarole');
  t.snapshot(ariarole('spinbutton'));

  t.timeout(200);
});
