import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'OptionalInline' should be present", (t) => {
  t.truthy(macros({}).lookup('optional_inline'));

  t.timeout(200);
});

test("Macros 'OptionalInline' should match the snapshot", (t) => {
  const optionalInline = macros({}).lookup('optional_inline');
  t.snapshot(optionalInline());

  t.timeout(200);
});
