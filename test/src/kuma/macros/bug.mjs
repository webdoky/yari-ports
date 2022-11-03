import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'bug' should be present", (t) => {
  t.truthy(testMacros().lookup('bug'));

  t.timeout(200);
});

test("Macros 'bug' should match the snapshot", (t) => {
  const bug = testMacros().lookup('bug');
  t.snapshot(bug(2368756, 'bug', 'bug comment'));

  t.timeout(200);
});
