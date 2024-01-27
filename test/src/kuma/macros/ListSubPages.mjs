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
  {
    path: '/uk/docs/Web/HTML/Element/input/button',
    slug: 'Web/HTML/Element/input/button',
    title: '<input type="button">',
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
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages());

  t.timeout(200);
});

test("Macros 'ListSubPages' should consider depth parameter", (t) => {
  const ListSubPages = macros({
    env: { path: '/uk/docs/Web/HTML/Element', targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages('/uk/docs/Web/HTML/Element', 2));

  t.timeout(200);
});

test("Macros 'ListSubPages' should consider reverse parameter", (t) => {
  const ListSubPages = macros({
    env: { path: '/uk/docs/Web/HTML/Element', targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages('/uk/docs/Web/HTML/Element', 1, 1));

  t.timeout(200);
});

test("Macros 'ListSubPages' should consider ordered parameter", (t) => {
  const ListSubPages = macros({
    env: { path: '/uk/docs/Web/HTML/Element', targetLocale: 'uk' },
    registry: {
      getChildren: () => CHILDREN_MOCK,
    },
  }).lookup('ListSubPages');

  t.snapshot(ListSubPages('/uk/docs/Web/HTML/Element', 1, 0, 1));

  t.timeout(200);
});
