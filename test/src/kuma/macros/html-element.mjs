import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'htmlElement' should be present", (t) => {
  t.truthy(macros({}).lookup('htmlElement'));

  t.timeout(200);
});

test("Macros 'htmlElement' should match the snapshot", (t) => {
  const htmlElement = macros({ env: { targetLocale: 'en-US' } }).lookup(
    'htmlElement'
  );
  t.snapshot(htmlElement('input/button', 'button'));

  t.timeout(200);
});
