import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'SVGRef' should be present", (t) => {
  t.truthy(macros({}).lookup('SVGRef'));

  t.timeout(200);
});

// TODO: update this snapshot later, when all our pages have proper page-type
test("Macros 'SVGRef' should generate complete navigation for SVG", (t) => {
  const SVGRef = macros({
    env: {
      targetLocale: 'uk',
      path: '/uk/docs/Web/SVG/Attribute/decoding',
    },
    registry: {
      hasPage: () => true,
    },
  }).lookup('SVGRef');

  t.snapshot(SVGRef());

  t.timeout(200);
});
