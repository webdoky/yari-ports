import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'htmlattrdef' should be present", (t) => {
  t.truthy(macros({}).lookup('htmlattrdef'));

  t.timeout(200);
});

test("Macros 'htmlattrdef' should generate anchor links", (t) => {
  const htmlattrdef = macros({}).lookup('htmlattrdef');
  t.snapshot(htmlattrdef('value'));

  t.timeout(200);
});
