import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'NonStandardHeader' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('Non-standard_header'));

  t.timeout(200);
});

test("Macros 'NonStandardHeader' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const nonStandardHeader = kumaPorts.lookup('Non-standard_header');
  t.snapshot(nonStandardHeader());

  t.timeout(200);
});