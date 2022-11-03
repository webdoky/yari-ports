import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'htmlattrxref' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('htmlattrxref'));

  t.timeout(200);
});

test("macros 'htmlattrxref' should generate links to elements", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const htmlattrxref = kumaPorts.lookup('htmlattrxref');
  t.snapshot(htmlattrxref('required', 'input'));

  t.timeout(200);
});

test("macros 'htmlattrxref' should generate links to global attributes", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const htmlattrxref = kumaPorts.lookup('htmlattrxref');
  t.snapshot(htmlattrxref('class'));

  t.timeout(200);
});
