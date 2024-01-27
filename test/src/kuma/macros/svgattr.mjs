import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'SVGAttr' should be present", (t) => {
  t.truthy(macros({}).lookup('SVGAttr'));

  t.timeout(200);
});

test("Macros 'SVGAttr' should generate links to items in SVG section", (t) => {
  const SVGAttr = macros({ env: { targetLocale: 'uk' } }).lookup('SVGAttr');
  t.snapshot(SVGAttr('begin'));

  t.timeout(200);
});
