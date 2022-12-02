import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'htmlref' should be present", (t) => {
  t.truthy(macros({}).lookup('htmlref'));

  t.timeout(200);
});

test("Macros 'htmlref' should return proper response", (t) => {
  const htmlref = macros({
    env: { slug: 'test-page', tags: ['HTML Test tag'], targetLocale: 'uk' },
    registry: {
      getChildren: () => [
        {
          slug: 'test-page/span',
          tags: ['HTML Test tag', 'Another tag'],
        },
      ],
      getPageBySlug: () => ({
        slug: 'test-page',
      }),
    },
  }).lookup('htmlref');
  t.snapshot(htmlref());

  t.timeout(200);
});
