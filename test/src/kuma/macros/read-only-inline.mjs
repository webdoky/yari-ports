import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'ReadOnlyInline' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('readonlyinline'));

  t.timeout(200);
});

test("macros 'ReadOnlyInline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const readonlyInline = kumaPorts.lookup('readonlyinline');
  t.snapshot(readonlyInline());

  t.timeout(200);
});
