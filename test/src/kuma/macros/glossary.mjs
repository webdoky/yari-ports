import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'glossary' should be present", (t) => {
  t.truthy(macros({}).lookup('glossary'));

  t.timeout(200);
});
