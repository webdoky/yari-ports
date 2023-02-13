import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'NonStandardHeader' should be present and be recognizable", (t) => {
  t.truthy(macros({}).lookup('Non-standard_header'));

  t.timeout(200);
});

test("Macros 'NonStandardHeader' should match the snapshot", (t) => {
  const nonStandardHeader = macros({}).lookup('Non-standard_header');
  t.snapshot(nonStandardHeader());

  t.timeout(200);
});
