import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'glossary' should be present", (t) => {
  t.truthy(testMacros().lookup('glossary'));

  t.timeout(200);
});
