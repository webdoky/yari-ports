import test from 'ava';

import { macros } from '../../../../lib/kuma';
import registryHtml from '../../mocks/registry-html.mjs';

test("Macros 'HtmlSidebar' should be present", (t) => {
  t.truthy(macros({}).lookup('HtmlSidebar'));

  t.timeout(200);
});

let toggle = false;

function hasPage() {
  toggle = !toggle;
  return toggle;
}

test("Macros 'HtmlSidebar' should generate complete navigation for given set of pages", (t) => {
  const HtmlSidebar = macros({
    env: {
      targetLocale: 'uk',
      slug: 'HTML/Element',
      path: '/uk/docs/HTML/Element',
    },
    registry: {
      hasPage,
    },
  }).lookup('HtmlSidebar');

  t.snapshot(HtmlSidebar());

  t.timeout(200);
});
