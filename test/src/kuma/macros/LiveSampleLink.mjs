import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'LiveSampleLink' should be present", (t) => {
  t.truthy(macros({}).lookup('LiveSampleLink'));

  t.timeout(200);
});

test("Macros 'LiveSampleLink' should generate links to appropriate live samples", (t) => {
  const LiveSampleLink = macros({
    env: {
      path: '/uk/docs/Web/API/IndexedDB_API/Using_IndexedDB',
    },
  }).lookup('LiveSampleLink');
  t.snapshot(LiveSampleLink('prostyi-pryklad', 'Простий приклад'));

  t.timeout(200);
});
