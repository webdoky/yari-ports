import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'CSS_Ref' should be present", (t) => {
  t.truthy(macros({}).lookup('cssref'));

  t.timeout(200);
});

test("Macros 'CSS_Ref' should generate full CSS index", (t) => {
  const CSS_Ref = macros({
    env: {
      targetLocale: 'uk',
    },
  }).lookup('CSS_Ref');

  t.snapshot(CSS_Ref());

  t.timeout(200);
});
