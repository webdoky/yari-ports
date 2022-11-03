import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'NonStandardHeader' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('Non-standard_header'));

  t.timeout(200);
});

test("Macros 'NonStandardHeader' should match the snapshot", (t) => {
  const nonStandardHeader = testMacros().lookup('Non-standard_header');
  t.snapshot(nonStandardHeader());

  t.timeout(200);
});
