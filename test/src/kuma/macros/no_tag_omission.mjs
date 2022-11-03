import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'no_tag_omission' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('no_tag_omission'));

  t.timeout(200);
});

test("macros 'no_tag_omission' should generate text string", (t) => {
  const kumaPorts = macros({});
  const noTagOmission = kumaPorts.lookup('no_tag_omission');
  t.snapshot(noTagOmission());

  t.timeout(200);
});
