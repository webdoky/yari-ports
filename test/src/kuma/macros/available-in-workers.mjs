import test from 'ava';

import { testMacros } from '../../utils.mjs';

test("Macros 'availableInWorkers' should be present and be recognizable", (t) => {
  t.truthy(testMacros().lookup('availableInWorkers'));

  t.timeout(200);
});

test("Macros 'availableInWorkers' should work without arguments", (t) => {
  const availableInWorkers = testMacros().lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers());

  t.timeout(200);
});

test("Macros 'availableInWorkers' should accept a single argument", (t) => {
  const availableInWorkers = testMacros().lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers('notservice'));

  t.timeout(200);
});
