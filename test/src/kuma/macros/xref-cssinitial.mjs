import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'xref_cssinitial' should be present", (t) => {
  t.truthy(macros({}).lookup('xref_cssinitial'));
});

test("Macros 'xref_cssinitial' should generate proper markup", (t) => {
  const xrefCssInitials = macros({ env: { targetLocale: 'uk' } }).lookup(
    'xref_cssinitial'
  );
  t.snapshot(xrefCssInitials());
});
