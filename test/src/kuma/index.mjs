import test from 'ava';
import { macros } from '../../../lib/kuma/index.js';

test("Macros function's result should contain a dictionary", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.dictionary);

  t.timeout(200);
});

test("Macros function's result should contain a lookup function", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup);

  t.timeout(200);
});
