import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'LiveSampleUrl' should be present", (t) => {
  t.truthy(testMacros().lookup('LiveSampleUrl'));

  t.timeout(200);
});
