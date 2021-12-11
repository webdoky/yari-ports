import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'jssidebar' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('jssidebar'));

  t.timeout(200);
});
