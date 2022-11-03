import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'ReadOnlyInline' should be present", (t) => {
  t.truthy(testMacros().lookup('readonlyinline'));

  t.timeout(200);
});

test("Macros 'ReadOnlyInline' should match the snapshot", (t) => {
  const readonlyInline = testMacros().lookup('readonlyinline');
  t.snapshot(readonlyInline());

  t.timeout(200);
});
