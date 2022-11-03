import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'EmbedLiveSample' should be present", (t) => {
  t.truthy(testMacros().lookup('EmbedLiveSample'));

  t.timeout(200);
});

test("Macros 'EmbedLiveSample' should generate proper markup", (t) => {
  const embedLiveSample = testMacros({
    env: { path: '/uk/docs/Web/HTML/Element/input' },
  }).lookup('EmbedLiveSample');
  t.snapshot(embedLiveSample('examplebutton', 200, 55, '', '', 'nobutton'));
});
