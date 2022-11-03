import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'xref_csscomputed' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('xref_csscomputed'));
});

test("macros 'xref_csscomputed' should generate proper markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const xrefCssComputed = kumaPorts.lookup('xref_csscomputed');
  t.snapshot(xrefCssComputed());
});
