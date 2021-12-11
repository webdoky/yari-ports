import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'jsxref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('jsxref'));

  t.timeout(200);
});
