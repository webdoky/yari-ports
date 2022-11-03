import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'cssSyntax' should be present", (t) => {
  t.truthy(testMacros().lookup('csssyntax'));
});

test("Macros 'cssSyntax' should generate markup", (t) => {
  const cssSyntax = testMacros({
    env: { slug: 'Web/CSS/height' },
  }).lookup('csssyntax');
  t.snapshot(cssSyntax());
});
