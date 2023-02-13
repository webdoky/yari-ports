import test from 'ava';

import { markdown, popularitiesJson } from '../../lib';

test('yari ports should contain popularities', (t) => {
  t.truthy(popularitiesJson);
});

test('yari ports should contain markdown helpers', (t) => {
  t.truthy(markdown);
});

test('yari ports should contain asDefinitionList function in markdown helpers', (t) => {
  const { asDefinitionList } = markdown;
  t.truthy(asDefinitionList);
});

test('yari ports should contain isDefinitionList function in markdown helpers', (t) => {
  const { isDefinitionList } = markdown;
  t.truthy(isDefinitionList);
});
