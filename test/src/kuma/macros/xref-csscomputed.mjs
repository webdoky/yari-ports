import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'xref_csscomputed' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('xref_csscomputed'));
});

test("Macros 'xref_csscomputed' should generate proper markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const xrefCssComputed = kumaPorts.lookup('xref_csscomputed');
  t.snapshot(xrefCssComputed());
});
