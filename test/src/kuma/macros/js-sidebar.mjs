import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'jssidebar' should be present", (t) => {
  t.truthy(macros({}).lookup('jssidebar'));

  t.timeout(200);
});
