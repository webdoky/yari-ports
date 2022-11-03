import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'cssref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('cssref'));

  t.timeout(200);
});
