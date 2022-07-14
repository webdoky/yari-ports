import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'htmlattrdef' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('htmlattrdef'));

  t.timeout(200);
});

test("Macros 'htmlattrdef' should generate anchor links", (t) => {
  const kumaPorts = macros({});
  const htmlattrdef = kumaPorts.lookup('htmlattrdef');
  t.snapshot(htmlattrdef('value'));

  t.timeout(200);
});
