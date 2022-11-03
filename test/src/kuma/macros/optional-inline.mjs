import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'OptionalInline' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('optional_inline'));

  t.timeout(200);
});

test("macros 'OptionalInline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const optionalInline = kumaPorts.lookup('optional_inline');
  t.snapshot(optionalInline());

  t.timeout(200);
});
