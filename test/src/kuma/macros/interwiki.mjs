import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'interwiki' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('interwiki'));

  t.timeout(200);
});

test("Macros 'interwiki' should generate links for wikipedia", (t) => {
  const kumaPorts = macros({});
  const interwiki = kumaPorts.lookup('interwiki');
  t.snapshot(interwiki('wikipedia', 'random_link'));

  t.timeout(200);
});

test("Macros 'interwiki' should generate links for Mozilla wiki", (t) => {
  const kumaPorts = macros({});
  const interwiki = kumaPorts.lookup('interwiki');
  t.snapshot(interwiki('wikimo', 'random_link'));

  t.timeout(200);
});

test("Macros 'interwiki' should accept the third argument as a caption text", (t) => {
  const kumaPorts = macros({});
  const interwiki = kumaPorts.lookup('interwiki');
  t.snapshot(interwiki('wikipedia', 'random_link', 'random_title'));

  t.timeout(200);
});
