import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("macros 'EmbedInteractiveExample' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('EmbedInteractiveExample'));

  t.timeout(200);
});

test("macros 'EmbedInteractiveExample' should generate proper markup", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/doc'));
});

test("macros 'EmbedInteractiveExample' should attach certain height to JS-examples", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc'));
});

test("macros 'EmbedInteractiveExample' should attach is-shorter-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'shorter'));
});

test("macros 'EmbedInteractiveExample' should attach is-taller-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'taller'));
});

test("macros 'EmbedInteractiveExample' should attach is-tabbed-shorter-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-shorter'));
});

test("macros 'EmbedInteractiveExample' should attach is-tabbed-standard-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-standard'));
});

test("macros 'EmbedInteractiveExample' should attach is-tabbed-taller-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-taller'));
});

test("macros 'EmbedInteractiveExample' should throw an error when provided with unsupported height class", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.throws(
    () => {
      t.throws(
        embedInteractiveExample('path/to/js/doc', 'an-unsupported-class'),
      );
    },
    { instanceOf: Error },
  );
});
