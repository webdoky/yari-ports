import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'svgelement' should be present", (t) => {
  t.truthy(testMacros().lookup('svgelement'));

  t.timeout(200);
});

test("Macros 'svgelement' should generate links to items in SVG section", (t) => {
  const svgelement = testMacros().lookup('svgelement');
  t.snapshot(svgelement('svg'));

  t.timeout(200);
});
