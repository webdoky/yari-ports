import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'SeeCompatTable' should be present", (t) => {
  t.truthy(macros({}).lookup('SeeCompatTable'));

  t.timeout(200);
});

test("Macros 'SeeCompatTable' should generate correct warning", (t) => {
  const SeeCompatTable = macros({}).lookup('SeeCompatTable');
  t.snapshot(SeeCompatTable());

  t.timeout(200);
});
