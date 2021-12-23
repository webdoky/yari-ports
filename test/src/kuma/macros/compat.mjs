import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'compat' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('compat'));
});

test("Macros 'compat' should generate markup according to given query", (t) => {
  const kumaPorts = macros({});
  const compat = kumaPorts.lookup('compat');
  t.snapshot(compat('css.types.-moz-image-rect'));
  // t.snapshot(compat('css.properties.display'));
});

// test("Macros 'specifications' should generate markup even without explicit query, if it is provided with the context", (t) => {
//   const kumaPorts = macros({ browserCompat: 'some.query' });
//   const specifications = kumaPorts.lookup('specifications');
//   t.snapshot(specifications());
// });

// test("Macros 'specifications' should generate markup with browser-compatibility information", (t) => {
//   const kumaPorts = macros({ browserCompat: 'css.properties.display' });
//   const specifications = kumaPorts.lookup('specifications');
//   t.snapshot(specifications());
// });
