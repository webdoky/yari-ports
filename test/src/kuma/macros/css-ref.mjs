import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'cssref' should be present", (t) => {
  t.truthy(testMacros().lookup('cssref'));

  t.timeout(200);
});
