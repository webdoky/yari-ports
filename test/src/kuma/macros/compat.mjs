import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'compat' should be present", (t) => {
  t.truthy(macros({ env: {} }).lookup('compat'));
});

test("Macros 'compat' should generate links based on implicit query", (t) => {
  const compat = macros({
    env: { browserCompat: 'javascript.builtins.Number' },
  }).lookup('compat');
  t.snapshot(compat());
});

test("Macros 'compat' should generate links based on array of queries", (t) => {
  const compat = macros({
    env: {
      browserCompat: [
        'javascript.builtins.Number',
        'javascript.builtins.String',
      ],
    },
  }).lookup('compat');
  t.snapshot(compat());
});
