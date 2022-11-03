import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'EmbedLiveSample' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('EmbedLiveSample'));

  t.timeout(200);
});

test("macros 'EmbedLiveSample' should generate proper markup", (t) => {
  const kumaPorts = macros({ path: '/uk/docs/Web/HTML/Element/input' });
  const embedLiveSample = kumaPorts.lookup('EmbedLiveSample');
  t.snapshot(embedLiveSample('examplebutton', 200, 55, '', '', 'nobutton'));
});
