import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'ReadOnlyInline' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('readonlyinline'));

  t.timeout(200);
});

test("Macros 'ReadOnlyInline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const readonlyInline = kumaPorts.lookup('readonlyinline');
  t.snapshot(readonlyInline());

  t.timeout(200);
});
