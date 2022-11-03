import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'NonStandardHeader' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('Non-standard_header'));

  t.timeout(200);
});

test("macros 'NonStandardHeader' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const nonStandardHeader = kumaPorts.lookup('Non-standard_header');
  t.snapshot(nonStandardHeader());

  t.timeout(200);
});
