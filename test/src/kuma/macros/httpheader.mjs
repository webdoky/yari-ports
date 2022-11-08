import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'httpheader' should be present", (t) => {
  t.truthy(testMacros().lookup('httpheader'));

  t.timeout(200);
});

test("Macros 'httpheader' should generate links to HTTP header pages", (t) => {
  const httpheader = testMacros().lookup('httpheader');
  t.snapshot(httpheader('Content-Security-Policy'));

  t.timeout(200);
});

test("Macros 'httpheader' should consider 4 arguments", (t) => {
  const httpheader = testMacros().lookup('httpheader');
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
