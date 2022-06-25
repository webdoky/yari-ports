import test from 'ava';
import yariPorts from '../../lib/index.js';

test('Yari ports should contain popularities', (t) => {
  const { popularitiesJson } = yariPorts;
  t.truthy(popularitiesJson);
});

test('Yari ports should contain markdown helpers', (t) => {
  const { markdown } = yariPorts;
  t.truthy(markdown);
});

test('Yari ports should contain asDefinitionList function in markdown helpers', (t) => {
  const {
    markdown: { asDefinitionList },
  } = yariPorts;
  t.truthy(asDefinitionList);
});

test('Yari ports should contain isDefinitionList function in markdown helpers', (t) => {
  const {
    markdown: { isDefinitionList },
  } = yariPorts;
  t.truthy(isDefinitionList);
});
