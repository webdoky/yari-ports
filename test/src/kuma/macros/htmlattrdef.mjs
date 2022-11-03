import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'htmlattrdef' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('htmlattrdef'));

  t.timeout(200);
});

test("macros 'htmlattrdef' should generate anchor links", (t) => {
  const kumaPorts = macros({});
  const htmlattrdef = kumaPorts.lookup('htmlattrdef');
  t.snapshot(htmlattrdef('value'));

  t.timeout(200);
});
