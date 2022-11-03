import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'cssInfo' should be present", (t) => {
  t.truthy(testMacros().lookup('csssyntax'));
});

test("Macros 'cssInfo' should generate markup", (t) => {
  const cssInfo = testMacros({
    env: { slug: 'Web/CSS/height' },
  }).lookup('cssInfo');
  t.snapshot(cssInfo());
});
