import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'Deprecated_Inline' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('Deprecated_Inline'));

  t.timeout(200);
});

test("Macros 'Deprecated_Inline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const deprecatedInline = kumaPorts.lookup('Deprecated_Inline');
  t.snapshot(deprecatedInline());

  t.timeout(200);
});
