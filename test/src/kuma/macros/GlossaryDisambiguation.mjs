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
          content:
            'Базова лінія — це невидима лінія, на якій стоять літери, цифри та інші знаки.\n\nЦей текст не повинен потрапити у вивід макроса.',
          path: '/uk/docs/Glossary/Baseline',
          slug: 'Glossary/Baseline/Typography',
          title: 'Базова лінія',
        },
        {
          content:
            'База – це сукупність можливостей, які можна використовувати з максимальною надійністю в усіх браузерах.\n\nЦей текст не повинен потрапити у вивід макроса.',
          path: '/uk/docs/Glossary/Baseline/Compatibility',
          slug: 'Glossary/Baseline/Compatibility',
          title: 'База',
        },
      ],
    },
  }).lookup('GlossaryDisambiguation');
  t.snapshot(GlossaryDisambiguation());
});
