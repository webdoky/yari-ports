import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'cssSyntax' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('csssyntax'));
});

test("Macros 'cssSyntax' should generate markup", (t) => {
  const kumaPorts = macros({ targetLocale: 'uk', slug: 'Web/CSS/height' });
  const cssSyntax = kumaPorts.lookup('csssyntax');
  t.snapshot(cssSyntax());
});
