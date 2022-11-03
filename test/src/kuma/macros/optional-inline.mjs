import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'OptionalInline' should be present", (t) => {
  t.truthy(testMacros().lookup('optional_inline'));

  t.timeout(200);
});

test("Macros 'OptionalInline' should match the snapshot", (t) => {
  const optionalInline = testMacros().lookup('optional_inline');
  t.snapshot(optionalInline());

  t.timeout(200);
});
