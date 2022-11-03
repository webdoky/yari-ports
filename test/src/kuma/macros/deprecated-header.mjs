import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'Deprecated_Header' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('deprecated_header'));

  t.timeout(200);
});

test("Macros 'Deprecated_Header' should match the snapshot", (t) => {
  const deprecatedHeader = testMacros().lookup('deprecated_header');
  t.snapshot(deprecatedHeader());

  t.timeout(200);
});
