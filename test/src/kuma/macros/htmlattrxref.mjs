import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'htmlattrxref' should be present", (t) => {
  t.truthy(testMacros().lookup('htmlattrxref'));

  t.timeout(200);
});

test("Macros 'htmlattrxref' should generate links to elements", (t) => {
  const htmlattrxref = testMacros().lookup('htmlattrxref');
  t.snapshot(htmlattrxref('required', 'input'));

  t.timeout(200);
});

test("Macros 'htmlattrxref' should generate links to global attributes", (t) => {
  const htmlattrxref = testMacros().lookup('htmlattrxref');
  t.snapshot(htmlattrxref('class'));

  t.timeout(200);
});
