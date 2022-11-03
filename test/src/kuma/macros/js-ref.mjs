import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'jsref' should be present", (t) => {
  t.truthy(testMacros().lookup('jsref'));

  t.timeout(200);
});
