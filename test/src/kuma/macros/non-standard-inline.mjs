import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'NonStandardInline' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('Non-Standard_Inline'));

  t.timeout(200);
});

test("Macros 'NonStandardInline' should match the snapshot", (t) => {
  const nonStandardInline = testMacros().lookup('Non-Standard_Inline');
  t.snapshot(nonStandardInline());

  t.timeout(200);
});
