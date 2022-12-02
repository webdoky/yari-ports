import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'experimental_inline' should be present and be recognizable", (t) => {
  t.truthy(macros({}).lookup('experimental_inline'));

  t.timeout(200);
});

test("Macros 'experimental_inline' should match the snapshot", (t) => {
  const experimentalInline = macros({}).lookup('experimental_inline');
  t.snapshot(experimentalInline());

  t.timeout(200);
});
