import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'LiveSampleUrl' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('LiveSampleUrl'));

  t.timeout(200);
});
