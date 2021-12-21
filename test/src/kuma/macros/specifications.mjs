import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'specifications' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('specifications'));
});

test("Macros 'specifications' should generate markup according to given query", (t) => {
  const kumaPorts = macros({});
  const specifications = kumaPorts.lookup('specifications');
  t.snapshot(specifications('some.query'));
});

test("Macros 'specifications' should generate markup even without explicit query, if it is provided with the context", (t) => {
  const kumaPorts = macros({ browserCompat: 'some.query' });
  const specifications = kumaPorts.lookup('specifications');
  t.snapshot(specifications());
});

test("Macros 'specifications' should generate markup with browser-compatibility information", (t) => {
  const kumaPorts = macros({ browserCompat: 'css.properties.display' });
  const specifications = kumaPorts.lookup('specifications');
  t.snapshot(specifications());
});
