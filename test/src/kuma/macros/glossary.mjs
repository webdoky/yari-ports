import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'glossary' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('glossary'));

  t.timeout(200);
});
