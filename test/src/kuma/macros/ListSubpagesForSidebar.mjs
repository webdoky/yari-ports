import test from 'ava';

import { macros } from '../../../../lib/kuma';

const CHILDREN_MOCK = [
  {
    path: '/uk/docs/Web/HTML/Element/a',
    slug: 'Web/HTML/Element/a',
    title: '<a>',
  },
  {
    path: '/uk/docs/Web/HTML/Element/abbr',
    slug: 'Web/HTML/Element/abbr',
    title: '<abbr>',
  },
  {
    path: '/uk/docs/Web/HTML/Element/input',
    slug: 'Web/HTML/Element/input',
    title: '<input>',
  },
];

test("Macros 'ListSubpagesForSidebar' should be present", (t) => {
  t.truthy(macros({}).lookup('ListSubpagesForSidebar'));

  t.timeout(200);
});

test("Macros 'ListSubpagesForSidebar' should return subpages of a specified page", (t) => {
  const ListSubpagesForSidebar = macros({
    env: { currentPath: '/uk/docs/Web/HTML/Element/abbr', targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
      getPageBySlug: () => ({
        slug: 'Web/HTML/Element',
        title: 'Довідник елементів HTML ',
      }),
      hasPage: () => true,
    },
  }).lookup('ListSubpagesForSidebar');

  t.snapshot(ListSubpagesForSidebar('/uk/docs/Web/HTML/Element'));

  t.timeout(200);
});
