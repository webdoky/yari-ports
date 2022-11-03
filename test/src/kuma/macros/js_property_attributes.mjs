import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'js_property_attributes' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('js_property_attributes'));
});

test("macros 'js_property_attributes' should generate markup", (t) => {
  const kumaPorts = macros({ title: 'Math.E' });
  const jsPropertyAttributes = kumaPorts.lookup('js_property_attributes');
  t.snapshot(jsPropertyAttributes());
});

test("macros 'js_property_attributes' should reflect writability of the property", (t) => {
  const kumaPorts = macros({ title: 'Math.E' });
  const jsPropertyAttributes = kumaPorts.lookup('js_property_attributes');
  t.snapshot(jsPropertyAttributes(1, 0, 0));
});

test("macros 'js_property_attributes' should reflect enumerability of the property", (t) => {
  const kumaPorts = macros({ title: 'Math.E' });
  const jsPropertyAttributes = kumaPorts.lookup('js_property_attributes');
  t.snapshot(jsPropertyAttributes(0, 1, 0));
});

test("macros 'js_property_attributes' should reflect configurability of the property", (t) => {
  const kumaPorts = macros({ title: 'Math.E' });
  const jsPropertyAttributes = kumaPorts.lookup('js_property_attributes');
  t.snapshot(jsPropertyAttributes(0, 0, 1));
});
