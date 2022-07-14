import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'svgelement' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('svgelement'));

  t.timeout(200);
});

test("Macros 'svgelement' should generate links to items in SVG section", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk' });
  const svgelement = kumaPorts.lookup('svgelement');
  t.snapshot(svgelement('svg'));

  t.timeout(200);
});
