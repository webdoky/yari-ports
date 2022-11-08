import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'EmbedLiveSample' should be present", (t) => {
  t.truthy(macros({}).lookup('EmbedLiveSample'));

  t.timeout(200);
});

test("Macros 'EmbedLiveSample' should generate proper markup", (t) => {
  const embedLiveSample = macros({
    env: { path: '/uk/docs/Web/HTML/Element/input', targetLocale: 'uk' },
  }).lookup('EmbedLiveSample');
  t.snapshot(embedLiveSample('examplebutton', 200, 55, '', '', 'nobutton'));
});
