import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'cssref' should be present", (t) => {
  t.truthy(macros({}).lookup('cssref'));

  t.timeout(200);
});
