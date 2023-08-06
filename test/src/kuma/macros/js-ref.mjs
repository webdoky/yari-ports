import test from 'ava';

import { macros } from '../../../../lib/kuma';
import registryJs from '../../mocks/registry-js.mjs';

test("Macros 'jsref' should be present", (t) => {
  t.truthy(macros({}).lookup('jsref'));

  t.timeout(200);
});

// TODO: update this snapshot later, when all our pages have proper page-type
test("Macros 'jsref' should generate complete navigation for standard object String", (t) => {
  const jsref = macros({
    env: {
      targetLocale: 'uk',
      slug: 'Web/JavaScript/Reference/Global_Objects/String/at',
      path: '/uk/docs/Web/JavaScript/Reference/Global_Objects/String/at',
    },
    registry: {
      getPagesData: () => registryJs,
    },
  }).lookup('jsref');

  t.snapshot(jsref());

  t.timeout(200);
});
