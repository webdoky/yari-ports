import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'RFC' should be present", (t) => {
  t.truthy(macros({}).lookup('rfc'));

  t.timeout(200);
});

test("Macros 'RFC' should generate links to RFC", (t) => {
  const RFC = macros({}).lookup('rfc');
  t.snapshot(RFC(1234));

  t.timeout(200);
});

test("Macros 'RFC' should insert text", (t) => {
  const RFC = macros({}).lookup('rfc');
  t.snapshot(RFC(1234, 'Issue name'));

  t.timeout(200);
});

test("Macros 'RFC' should insert section number", (t) => {
  const RFC = macros({}).lookup('rfc');
  t.snapshot(RFC(1234, 'Issue name', 4321));

  t.timeout(200);
});
