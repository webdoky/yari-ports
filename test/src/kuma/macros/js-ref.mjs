import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'jsref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('jsref'));

  t.timeout(200);
});
