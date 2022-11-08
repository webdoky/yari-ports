import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'LiveSampleUrl' should be present", (t) => {
  t.truthy(macros({}).lookup('LiveSampleUrl'));

  t.timeout(200);
});
