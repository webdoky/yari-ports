import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'glossary' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('glossary'));

  t.timeout(200);
});
