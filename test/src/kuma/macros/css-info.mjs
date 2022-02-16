import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'cssInfo' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('csssyntax'));
});

test("Macros 'cssInfo' should generate markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk', slug: 'Web/CSS/height' });
  const cssInfo = kumaPorts.lookup('cssInfo');
  t.snapshot(cssInfo());
});
