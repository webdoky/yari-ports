import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'xref_cssinherited' should be present", (t) => {
  t.truthy(testMacros().lookup('xref_cssinherited'));
});

test("Macros 'xref_cssinherited' should generate proper markup", (t) => {
  const xrefCssInherited = testMacros().lookup('xref_cssinherited');
  t.snapshot(xrefCssInherited());
});
