import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'Deprecated_Header' should be present and be recognizable", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('deprecated_header'));

  t.timeout(200);
});

test("Macros 'Deprecated_Header' should match the snapshot", (t) => {
  const kumaPorts = macros({});
  const deprecatedHeader = kumaPorts.lookup('deprecated_header');
  t.snapshot(deprecatedHeader());

  t.timeout(200);
});
