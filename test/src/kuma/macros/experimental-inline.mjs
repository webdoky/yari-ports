import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'experimental_Inline' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('experimental_Inline'));

  t.timeout(200);
});

test("Macros 'experimental_Inline' should match the snapshot", (t) => {
  const experimentalInline = testMacros().lookup('experimental_Inline');
  t.snapshot(experimentalInline());

  t.timeout(200);
});
