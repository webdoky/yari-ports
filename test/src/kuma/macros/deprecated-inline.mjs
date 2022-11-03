import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'Deprecated_Inline' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('Deprecated_Inline'));

  t.timeout(200);
});

test("Macros 'Deprecated_Inline' should match the snapshot", (t) => {
  const deprecatedInline = testMacros().lookup('Deprecated_Inline');
  t.snapshot(deprecatedInline());

  t.timeout(200);
});
