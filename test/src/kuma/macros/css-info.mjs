import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'cssInfo' should be present", (t) => {
  t.truthy(
    macros({
      env: { slug: 'Web/CSS/height' },
    }).lookup('cssInfo')
  );
});

test("Macros 'cssInfo' should generate markup for a property", (t) => {
  const cssInfo = macros({
    env: { slug: 'Web/CSS/height', targetLocale: 'uk' },
    registry: {
      getPageBySlug: () => ({
        tags: [
          'CSS',
          'CSS Property',
          'Layout',
          'Reference',
          'Vertical',
          'dimensions',
          'height',
          'recipe:css-property',
          'size',
        ],
      }),
    },
  }).lookup('cssInfo');
  t.snapshot(cssInfo());
});
