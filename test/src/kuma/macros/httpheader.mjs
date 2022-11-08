import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'httpheader' should be present", (t) => {
  t.truthy(macros({}).lookup('httpheader'));

  t.timeout(200);
});

test("Macros 'httpheader' should generate links to HTTP header pages", (t) => {
  const httpheader = macros({ env: { targetLocale: 'uk' } }).lookup(
    'httpheader'
  );
  t.snapshot(httpheader('Content-Security-Policy'));

  t.timeout(200);
});

test("Macros 'httpheader' should consider 4 arguments", (t) => {
  const httpheader = macros({ env: { targetLocale: 'uk' } }).lookup(
    'httpheader'
  );
  t.snapshot(
    httpheader(
      'Content-Security-Policy',
      'Content security policy',
      'section-name',
      true
    )
  );

  t.timeout(200);
});
