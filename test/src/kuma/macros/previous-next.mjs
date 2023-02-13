import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'previousnext' should be present", (t) => {
  t.truthy(macros({}).lookup('previousnext'));

  t.timeout(200);
});

test("Macros 'previousnext' should generate links to both paths", (t) => {
  const previousnext = macros({}).lookup('previousnext');
  t.snapshot(previousnext('/somepathback', '/somepathforward'));

  t.timeout(200);
});

test("Macros 'previousnext' should generate links to prev path", (t) => {
  const previousnext = macros({}).lookup('previousnext');
  t.snapshot(previousnext('/somepathback'));

  t.timeout(200);
});

test("Macros 'previousnext' should generate links to next path", (t) => {
  const previousnext = macros({}).lookup('previousnext');
  t.snapshot(previousnext(null, '/somepathforward'));

  t.timeout(200);
});
