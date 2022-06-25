import test from 'ava';
import { macros } from '../../../../lib/kuma/index.js';

test("Macros 'EmbedInteractiveExample' should be present", (t) => {
  const kumaPorts = macros({});
  t.truthy(kumaPorts.lookup('EmbedInteractiveExample'));

  t.timeout(200);
});

test("Macros 'EmbedInteractiveExample' should generate proper markup", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/doc'));
});

test("Macros 'EmbedInteractiveExample' should attach certain height to JS-examples", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc'));
});

test("Macros 'EmbedInteractiveExample' should attach is-shorter-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'shorter'));
});

test("Macros 'EmbedInteractiveExample' should attach is-taller-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'taller'));
});

test("Macros 'EmbedInteractiveExample' should attach is-tabbed-shorter-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-shorter'));
});

test("Macros 'EmbedInteractiveExample' should attach is-tabbed-standard-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-standard'));
});

test("Macros 'EmbedInteractiveExample' should attach is-tabbed-taller-height class to iframe if provided with respective arguments", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.snapshot(embedInteractiveExample('path/to/js/doc', 'tabbed-taller'));
});

test("Macros 'EmbedInteractiveExample' should throw an error when provided with unsupported height class", (t) => {
  const kumaPorts = macros({});
  const embedInteractiveExample = kumaPorts.lookup('EmbedInteractiveExample');
  t.throws(
    () => {
      t.throws(
        embedInteractiveExample('path/to/js/doc', 'an-unsupported-class')
      );
    },
    { instanceOf: Error }
  );
});
