import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'LiveSampleUrl' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('LiveSampleUrl'));

  t.timeout(200);
});
