import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'NonStandardInline' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('Non-Standard_Inline'));

  t.timeout(200);
});

test("macros 'NonStandardInline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const nonStandardInline = kumaPorts.lookup('Non-Standard_Inline');
  t.snapshot(nonStandardInline());

  t.timeout(200);
});
