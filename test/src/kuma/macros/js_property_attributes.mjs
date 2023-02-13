import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'js_property_attributes' should be present", (t) => {
  t.truthy(macros({}).lookup('js_property_attributes'));
});

test("Macros 'js_property_attributes' should generate markup", (t) => {
  const jsPropertyAttributes = macros({ env: { title: 'Math.E' } }).lookup(
    'js_property_attributes',
  );
  t.snapshot(jsPropertyAttributes());
});

test("Macros 'js_property_attributes' should reflect writability of the property", (t) => {
  const jsPropertyAttributes = macros({ env: { title: 'Math.E' } }).lookup(
    'js_property_attributes',
  );
  t.snapshot(jsPropertyAttributes(1, 0, 0));
});

test("Macros 'js_property_attributes' should reflect enumerability of the property", (t) => {
  const jsPropertyAttributes = macros({ env: { title: 'Math.E' } }).lookup(
    'js_property_attributes',
  );
  t.snapshot(jsPropertyAttributes(0, 1, 0));
});

test("Macros 'js_property_attributes' should reflect configurability of the property", (t) => {
  const jsPropertyAttributes = macros({ env: { title: 'Math.E' } }).lookup(
    'js_property_attributes',
  );
  t.snapshot(jsPropertyAttributes(0, 0, 1));
});
