import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'ReadOnlyInline' should be present", (t) => {
  t.truthy(macros({}).lookup('readonlyinline'));

  t.timeout(200);
});

test("Macros 'ReadOnlyInline' should match the snapshot", (t) => {
  const readonlyInline = macros({}).lookup('readonlyinline');
  t.snapshot(readonlyInline());

  t.timeout(200);
});
