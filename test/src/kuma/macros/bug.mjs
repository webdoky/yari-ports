import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'bug' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('bug'));

  t.timeout(200);
});

test("macros 'bug' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const bug = kumaPorts.lookup('bug');
  t.snapshot(bug(2_368_756, 'bug', 'bug comment'));

  t.timeout(200);
});
