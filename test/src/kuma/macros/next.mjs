import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'next' should be present", (t) => {
  t.truthy(macros({}).lookup('next'));

  t.timeout(200);
});

test("Macros 'next' should generate links to next path", (t) => {
  const next = macros({}).lookup('next');
  t.snapshot(next('/somepathforward'));

  t.timeout(200);
});
