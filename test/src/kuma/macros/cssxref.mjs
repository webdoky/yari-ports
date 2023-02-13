import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'cssxref' should be present", (t) => {
  t.truthy(macros({}).lookup('cssxref'));
});

test("Macros 'cssxref' should return a link with proper href and text caption", (t) => {
  const cssxref = macros({
    env: { targetLocale: 'en-US' },
    registry: {
      getPageBySlug: () => ({
        tags: [
          'CSS',
          'CSS Function',
          'CSS Images',
          'CSS:Mozilla Extensions',
          'Function',
          'Non-standard',
          'Reference',
        ],
      }),
    },
  }).lookup('CSSxRef');
  t.snapshot(cssxref('-moz-image-rect'));
});

test("Macros 'cssxref' should generate special link for '&lt;color&gt;'", (t) => {
  const cssxref = macros({
    env: { targetLocale: 'en-US' },
    registry: {
      getPageBySlug: () => ({ tags: [] }),
    },
  }).lookup('CSSxRef');
  t.snapshot(cssxref('&lt;color&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;flex&gt;'", (t) => {
  const cssxref = macros({
    env: { targetLocale: 'en-US' },
    registry: {
      getPageBySlug: () => ({ tags: [] }),
    },
  }).lookup('CSSxRef');
  t.snapshot(cssxref('&lt;flex&gt;'));
});

test("Macros 'cssxref' should generate special link for '&lt;position&gt;'", (t) => {
  const cssxref = macros({
    env: { targetLocale: 'en-US' },
    registry: {
      getPageBySlug: () => ({ tags: [] }),
    },
  }).lookup('CSSxRef');
  t.snapshot(cssxref('&lt;position&gt;'));
});

test("Macros 'cssxref' should return a link for a data type", (t) => {
  const cssxref = macros({
    env: { targetLocale: 'en-US' },
    registry: {
      getPageBySlug: () => ({
        tags: [
          'CSS',
          'CSS Data Type',
          'Data Type',
          'Layout',
          'Reference',
          'Web',
          'color',
          'hsl',
          'hsla',
          'rgb',
          'rgba',
          'unit',
          'lch',
          'lab',
          'lwb',
        ],
      }),
    },
  }).lookup('CSSxRef');
  t.snapshot(cssxref('color_value'));
});
