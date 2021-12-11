import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'ReadOnlyInline' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('readonlyinline'));

  t.timeout(200);
});
