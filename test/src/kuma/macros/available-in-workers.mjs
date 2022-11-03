import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'availableInWorkers' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('availableInWorkers'));

  t.timeout(200);
});

test("macros 'availableInWorkers' should work without arguments", (t) => {
  const kumaPorts = macros({});
  const availableInWorkers = kumaPorts.lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers());

  t.timeout(200);
});

test("macros 'availableInWorkers' should accept a single argument", (t) => {
  const kumaPorts = macros({});
  const availableInWorkers = kumaPorts.lookup('AvailableInWorkers');
  t.snapshot(availableInWorkers('notservice'));

  t.timeout(200);
});
