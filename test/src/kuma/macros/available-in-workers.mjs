import test from 'ava';

import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'availableInWorkers' should be present and be recognizable", (t) => {
  t.truthy(macros({}).lookup('availableInWorkers'));

  t.timeout(200);
});

test("Macros 'availableInWorkers' should work without arguments", (t) => {
  const availableInWorkers = macros({}).lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers());

  t.timeout(200);
});

test("Macros 'availableInWorkers' should accept a single argument", (t) => {
  const availableInWorkers = macros({}).lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers('notservice'));

  t.timeout(200);
});
