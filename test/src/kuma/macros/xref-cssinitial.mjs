import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'xref_cssinitial' should be present", (t) => {
  t.truthy(testMacros().lookup('xref_cssinitial'));
});

test("Macros 'xref_cssinitial' should generate proper markup", (t) => {
  const xrefCssInitials = testMacros().lookup('xref_cssinitial');
  t.snapshot(xrefCssInitials());
});
