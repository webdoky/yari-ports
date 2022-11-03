import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'htmlattrdef' should be present", (t) => {
  t.truthy(testMacros().lookup('htmlattrdef'));

  t.timeout(200);
});

test("Macros 'htmlattrdef' should generate anchor links", (t) => {
  const htmlattrdef = testMacros().lookup('htmlattrdef');
  t.snapshot(htmlattrdef('value'));

  t.timeout(200);
});
