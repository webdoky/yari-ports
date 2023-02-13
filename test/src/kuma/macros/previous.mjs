import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'previous' should be present", (t) => {
  t.truthy(macros({}).lookup('previous'));

  t.timeout(200);
});

test("Macros 'previous' should generate links to prev path", (t) => {
  const previous = macros({}).lookup('previous');
  t.snapshot(previous('/somepathback'));

  t.timeout(200);
});
