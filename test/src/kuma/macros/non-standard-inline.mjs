import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'NonStandardInline' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('readonlyinline'));

  t.timeout(200);
});

test("Macros 'NonStandardInline' should be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('Non-Standard_Inline'));

  t.timeout(200);
});

test("Macros 'NonStandardInline' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const nonStandardInline = kumaPorts.lookup('Non-Standard_Inline');
  t.snapshot(nonStandardInline());

  t.timeout(200);
});
