import test from 'ava';

import { injectCallMacro } from '../../../lib/kuma';

test('The callMacro function in the context', (t) => {
  const newContext = injectCallMacro({ smth: '???' });
  t.truthy(newContext.callMacro);
  t.timeout(200);
});

test('Old properties are preserved in the context', (t) => {
  const initialContext = { smth: '???' };

  const newContext = injectCallMacro(initialContext);
  t.is(newContext.smth, initialContext.smth);

  t.timeout(200);
});

test("callMacro function applies the given context in it's scope", (t) => {
  const initialContext = { smth: '???' };

  const newContext = injectCallMacro(initialContext);

  function macro() {
    t.is(this.smth, initialContext.smth);
    t.truthy(this.callMacro);
  }

  newContext.callMacro(macro);

  t.timeout(200);
});

test("callMacro function applies the given context in it's scope recursively", (t) => {
  const initialContext = { smth: '???' };

  const newContext = injectCallMacro(initialContext);

  function innerMacro() {
    t.is(this.smth, initialContext.smth);
    t.truthy(this.callMacro);
  }

  function outerMacro() {
    return newContext.callMacro(innerMacro);
  }

  newContext.callMacro(outerMacro);

  t.timeout(200);
});

test('callMacro function correctly returns result of recursively called macros', (t) => {
  const sampleContent = '<inner macro result>';

  const newContext = injectCallMacro({});

  function innerMacro() {
    return sampleContent;
  }

  function outerMacro() {
    return newContext.callMacro(innerMacro);
  }

  t.is(sampleContent, newContext.callMacro(outerMacro));

  t.timeout(200);
});
