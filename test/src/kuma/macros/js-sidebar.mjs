import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'jssidebar' should be present", (t) => {
  t.truthy(testMacros().lookup('jssidebar'));

  t.timeout(200);
});
