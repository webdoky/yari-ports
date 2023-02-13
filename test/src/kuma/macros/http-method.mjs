import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'httpmethod' should be present", (t) => {
  t.truthy(macros({}).lookup('httpmethod'));

  t.timeout(200);
});

test("Macros 'httpmethod' should generate links to items in HTTP method section", (t) => {
  const httpmethod = macros({}).lookup('httpmethod');
  t.snapshot(httpmethod('get'));

  t.timeout(200);
});

test("Macros 'httpmethod' should generate links with pretty names", (t) => {
  const httpmethod = macros({}).lookup('httpmethod');
  t.snapshot(httpmethod('get', 'Get', null, true));

  t.timeout(200);
});
