import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'mathmlelement' should be present", (t) => {
  t.truthy(macros({}).lookup('mathmlelement'));

  t.timeout(200);
});

test("Macros 'mathmlelement' should generate links to items in MathML section", (t) => {
  const mathmlelement = macros({}).lookup('mathmlelement');
  t.snapshot(mathmlelement('math'));

  t.timeout(200);
});
