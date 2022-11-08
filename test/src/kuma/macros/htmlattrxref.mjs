import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'htmlattrxref' should be present", (t) => {
  t.truthy(macros({}).lookup('htmlattrxref'));

  t.timeout(200);
});

test("Macros 'htmlattrxref' should generate links to elements", (t) => {
  const htmlattrxref = macros({ env: { targetLocale: 'uk' } }).lookup(
    'htmlattrxref'
  );
  t.snapshot(htmlattrxref('required', 'input'));

  t.timeout(200);
});

test("Macros 'htmlattrxref' should generate links to global attributes", (t) => {
  const htmlattrxref = macros({ env: { targetLocale: 'uk' } }).lookup(
    'htmlattrxref'
  );
  t.snapshot(htmlattrxref('class'));

  t.timeout(200);
});
