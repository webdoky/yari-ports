import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'GlossaryDisambiguation' should be present", (t) => {
  t.truthy(macros({}).lookup('GlossaryDisambiguation'));

  t.timeout(200);
});

test("Macros 'GlossaryDisambiguation' should generate markup according to its contex", (t) => {
  const GlossaryDisambiguation = macros({
    env: { slug: 'Glossary/Baseline', targetLocale: 'uk' },
    registry: {
      getChildren: () => [
        {
          description:
            'Базова лінія — це невидима лінія, на якій стоять літери, цифри та інші знаки.',
          path: '/uk/docs/Glossary/Baseline',
          slug: 'Glossary/Baseline/Typography',
          title: 'Базова лінія',
        },
        {
          slug: 'Glossary/Baseline/Compatibility',
          title: 'База',
          description:
            'База – це сукупність можливостей, які можна використовувати з максимальною надійністю в усіх браузерах.',
          path: '/uk/docs/Glossary/Baseline/Compatibility',
        },
      ],
    },
  }).lookup('GlossaryDisambiguation');
  t.snapshot(GlossaryDisambiguation());
});
