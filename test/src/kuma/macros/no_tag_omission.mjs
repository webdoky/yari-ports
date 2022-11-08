import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'no_tag_omission' should be present", (t) => {
  t.truthy(macros({}).lookup('no_tag_omission'));

  t.timeout(200);
});

test("Macros 'no_tag_omission' should generate text string", (t) => {
  const noTagOmission = macros({}).lookup('no_tag_omission');
  t.snapshot(noTagOmission());

  t.timeout(200);
});
