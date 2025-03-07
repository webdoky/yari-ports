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

test("Macros 'ListSubPages' should be present", (t) => {
  t.truthy(macros({}).lookup('ListSubPages'));

  t.timeout(200);
});

test("Macros 'ListSubPages' should render subpages of a specified page", (t) => {
  const ListSubPages = macros({
    env: { targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
      getPageBySlug: () => ({
        slug: 'Web/HTML/Element',
        title: 'Довідник елементів HTML',
      }),
      hasPage: () => true,
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages('/uk/docs/Web/HTML/Element'));

  t.timeout(200);
});

test("Macros 'ListSubPages' should render subpages of a current page", (t) => {
  const ListSubPages = macros({
    env: { path: '/uk/docs/Web/HTML/Element', targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
      getPageBySlug: () => ({
        slug: 'Web/HTML/Element',
        title: 'Довідник елементів HTML',
      }),
      hasPage: () => true,
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages());

  t.timeout(200);
});
