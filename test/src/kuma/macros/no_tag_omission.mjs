import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'no_tag_omission' should be present", (t) => {
  t.truthy(testMacros().lookup('no_tag_omission'));

  t.timeout(200);
});

test("Macros 'no_tag_omission' should generate text string", (t) => {
  const noTagOmission = testMacros().lookup('no_tag_omission');
  t.snapshot(noTagOmission());

  t.timeout(200);
});
