import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'jsref' should be present", (t) => {
  t.truthy(macros({}).lookup('jsref'));

  t.timeout(200);
});
