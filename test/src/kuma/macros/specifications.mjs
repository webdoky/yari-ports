import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'specifications' should be present", (t) => {
  t.truthy(macros({}).lookup('specifications'));
});

test("Macros 'specifications' should generate markup even without explicit query, if it is provided with the context", (t) => {
  const specifications = macros({
    env: { browserCompat: 'some.query' },
  }).lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should generate markup with browser-compatibility information", (t) => {
  const specifications = macros({
    env: { browserCompat: 'css.properties.display' },
  }).lookup('specifications');
  t.snapshot(specifications());
});
test("Macros 'specifications' should support 'browserCompat' as an array", (t) => {
  const specifications = macros({
    env: {
      browserCompat: ['css.properties.display', 'css.properties.color'],
      specUrls: 'https://drafts.csswg.org/selectors/#specificity-rules',
    },
  }).lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should support 'specUrls' parameter", (t) => {
  const specifications = macros({
    env: {
      specUrls: 'https://drafts.csswg.org/selectors/#specificity-rules',
    },
  }).lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should support 'specUrls' parameter without anchors in it", (t) => {
  const specifications = macros({
    env: {
      specUrls: 'https://drafts.csswg.org/css-flexbox/',
    },
  }).lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should support 'specUrls' as an array", (t) => {
  const specifications = macros({
    env: {
      specUrls: [
        'https://drafts.csswg.org/css-flexbox/',
        'https://drafts.csswg.org/selectors/#specificity-rules',
      ],
      browserCompat: 'css.properties.display',
    },
  }).lookup('specifications');
  t.snapshot(specifications());
});
