import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'cssSyntax' should be present", (t) => {
  t.truthy(macros({}).lookup('csssyntax'));
});

test("Macros 'cssSyntax' should generate markup", (t) => {
  const cssSyntax = macros({
    env: { slug: 'Web/CSS/height', targetLocale: 'uk' },
  }).lookup('csssyntax');
  t.snapshot(cssSyntax());
});
