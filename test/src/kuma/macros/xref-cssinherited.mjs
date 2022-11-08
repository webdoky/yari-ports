import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'xref_cssinherited' should be present", (t) => {
  t.truthy(macros({}).lookup('xref_cssinherited'));
});

test("Macros 'xref_cssinherited' should generate proper markup", (t) => {
  const xrefCssInherited = macros({ env: { targetLocale: 'uk' } }).lookup(
    'xref_cssinherited'
  );
  t.snapshot(xrefCssInherited());
});
