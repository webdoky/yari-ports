import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'xref_csscomputed' should be present", (t) => {
  t.truthy(macros({}).lookup('xref_csscomputed'));
});

test("Macros 'xref_csscomputed' should generate proper markup", (t) => {
  const xrefCssComputed = macros({ env: { targetLocale: 'uk' } }).lookup(
    'xref_csscomputed',
  );
  t.snapshot(xrefCssComputed());
});
