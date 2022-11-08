import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'NonStandardInline' should be present and be recognizable", (t) => {
  t.truthy(macros({}).lookup('Non-Standard_Inline'));

  t.timeout(200);
});

test("Macros 'NonStandardInline' should match the snapshot", (t) => {
  const nonStandardInline = macros({}).lookup('Non-Standard_Inline');
  t.snapshot(nonStandardInline());

  t.timeout(200);
});
