import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'xref_cssinherited' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('xref_cssinherited'));
});

test("macros 'xref_cssinherited' should generate proper markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const xrefCssInherited = kumaPorts.lookup('xref_cssinherited');
  t.snapshot(xrefCssInherited());
});
