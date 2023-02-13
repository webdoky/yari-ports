import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'svgelement' should be present", (t) => {
  t.truthy(macros({}).lookup('svgelement'));

  t.timeout(200);
});

test("Macros 'svgelement' should generate links to items in SVG section", (t) => {
  const svgelement = macros({ env: { targetLocale: 'uk' } }).lookup(
    'svgelement',
  );
  t.snapshot(svgelement('svg'));

  t.timeout(200);
});
