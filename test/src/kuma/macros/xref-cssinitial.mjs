import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'xref_cssinitial' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('xref_cssinitial'));
});

test("Macros 'xref_cssinitial' should generate proper markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const xrefCssInitials = kumaPorts.lookup('xref_cssinitial');
  t.snapshot(xrefCssInitials());
});
