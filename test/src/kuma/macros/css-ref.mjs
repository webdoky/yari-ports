import test from 'ava';

import { macros } from '../../../../lib/kuma';
import registryCss from '../../mocks/registry-css.mjs';

test("Macros 'cssref' should be present", (t) => {
  t.truthy(macros({}).lookup('cssref'));

  t.timeout(200);
});

test("Macros 'cssref' should generate complete navigation for given set of properties pages", (t) => {
  const cssref = macros({
    env: {
      targetLocale: 'uk',
      slug: 'Web/CSS/-webkit-border-before',
      path: '/uk/docs/Web/CSS/-webkit-border-before',
    },
    registry: {
      getPagesData: () => registryCss,
    },
  }).lookup('cssref');

  t.snapshot(cssref());

  t.timeout(200);
});
