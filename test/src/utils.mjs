import { macros } from '../../lib/kuma/index.js';

class TestContext {
  constructor({ env } = {}) {
    this.env = {
      ...this.env,
      ...env,
    };
  }
  callMacro(macro, ...args) {
    return macro.call(this, ...args);
  }
  env = {
    browserCompat: 'css.properties.background',
    slug: 'Web/CSS/background',
    targetLocale: 'uk',
    title: 'Test page for background',
  };
}

export function testMacros(contextOptions) {
  const context = new TestContext(contextOptions);
  return macros(context);
}
