import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'bug' should be present", (t) => {
  t.truthy(macros({}).lookup('bug'));

  t.timeout(200);
});

test("Macros 'bug' should match the snapshot", (t) => {
  const bug = macros({}).lookup('bug');
  t.snapshot(bug(2368756, 'bug', 'bug comment'));

  t.timeout(200);
});
