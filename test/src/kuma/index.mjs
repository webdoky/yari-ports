import test from 'ava';

import { macros } from '../../../lib/kuma';

test("macros function's result should contain a dictionary", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.dictionary);

  t.timeout(200);
});

test("macros function's result should contain a lookup function", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup);

  t.timeout(200);
});
