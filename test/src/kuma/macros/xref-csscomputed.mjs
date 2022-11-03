import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'xref_csscomputed' should be present", (t) => {
  t.truthy(testMacros().lookup('xref_csscomputed'));
});

test("Macros 'xref_csscomputed' should generate proper markup", (t) => {
  const xrefCssComputed = testMacros().lookup('xref_csscomputed');
  t.snapshot(xrefCssComputed());
});
