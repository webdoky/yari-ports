import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'htmlElement' should be present", (t) => {
  t.truthy(testMacros().lookup('htmlElement'));

  t.timeout(200);
});

test("Macros 'htmlElement' should match the snapshot", (t) => {
  const htmlElement = testMacros({ env: { targetLocale: 'en-US' } }).lookup(
    'htmlElement'
  );
  t.snapshot(htmlElement('input/button', 'button'));

  t.timeout(200);
});
