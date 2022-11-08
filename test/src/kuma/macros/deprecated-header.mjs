import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'Deprecated_Header' should be present and be recognizable", (t) => {
  t.truthy(macros({}).lookup('deprecated_header'));

  t.timeout(200);
});

test("Macros 'Deprecated_Header' should match the snapshot", (t) => {
  const deprecatedHeader = macros({ env: { targetLocale: 'uk' } }).lookup(
    'deprecated_header',
  );
  t.snapshot(deprecatedHeader());

  t.timeout(200);
});
