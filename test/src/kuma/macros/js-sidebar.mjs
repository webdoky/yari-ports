import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'jssidebar' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('jssidebar'));

  t.timeout(200);
});
