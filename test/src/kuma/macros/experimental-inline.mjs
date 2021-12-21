import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'experimental_Inline' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('experimental_Inline'));

  t.timeout(200);
});

test("Macros 'experimental_Inline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const experimentalInline = kumaPorts.lookup('experimental_Inline');
  t.snapshot(experimentalInline());

  t.timeout(200);
});