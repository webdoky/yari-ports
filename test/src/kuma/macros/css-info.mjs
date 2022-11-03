import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'cssInfo' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('csssyntax'));
});

test("macros 'cssInfo' should generate markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk', slug: 'Web/CSS/height' });
  const cssInfo = kumaPorts.lookup('cssInfo');
  t.snapshot(cssInfo());
});
