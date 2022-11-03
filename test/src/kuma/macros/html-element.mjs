import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'htmlElement' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('htmlElement'));

  t.timeout(200);
});

test("macros 'htmlElement' should match the snapshot", (t) => {
  const kumaPorts = macros({ targetLocale: 'en-US' });
  const htmlElement = kumaPorts.lookup('htmlElement');
  t.snapshot(htmlElement('input/button', 'button'));

  t.timeout(200);
});
