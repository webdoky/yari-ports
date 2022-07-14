import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'no_tag_omission' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('no_tag_omission'));

  t.timeout(200);
});

test("Macros 'no_tag_omission' should generate text string", (t) => {
  const kumaPorts = macros({});
  const noTagOmission = kumaPorts.lookup('no_tag_omission');
  t.snapshot(noTagOmission());

  t.timeout(200);
});
