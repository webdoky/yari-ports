import test from 'ava';

import { macros } from '../../../../lib/kuma';

test("Macros 'GlossarySidebar' should be present", (t) => {
  t.truthy(macros({}).lookup('GlossarySidebar'));

  t.timeout(200);
});

test("Macros 'GlossarySidebar' should generate partial navigation for glossary", (t) => {
  const GlossarySidebar = macros({
    env: {
      slug: 'Glossary/Truthy',
    },
    registry: {
      getChildren: () => [
        {
          hasLocalizedContent: true,
          title: 'Хибні значення',
          path: '/en-US/docs/Glossary/Falsy',
          slug: 'Glossary/Falsy',
        },
        {
          hasLocalizedContent: true,
          title: 'Істинні значення',
          path: '/en-US/docs/Glossary/Truthy',
          slug: 'Glossary/Truthy',
        },
        {
          title: 'Undefined',
          path: '/en-US/docs/Glossary/Undefined',
          slug: 'Glossary/Undefined',
        },
        {
          title: 'Null',
          path: '/en-US/docs/Glossary/Null',
          slug: 'Glossary/Null',
        },
        {
          title: 'NaN',
          path: '/en-US/docs/Glossary/NaN',
          slug: 'Glossary/NaN',
        },
        {
          title: 'Primitive',
          path: '/en-US/docs/Glossary/Primitive',
          slug: 'Glossary/Primitive',
        },
        {
          title: 'Object',
          path: '/en-US/docs/Glossary/Object',
          slug: 'Glossary/Object',
        },
        {
          title: 'Array',
          path: '/en-US/docs/Glossary/Array',
          slug: 'Glossary/Array',
        },
        {
          title: 'Function',
          path: '/en-US/docs/Glossary/Function',
          slug: 'Glossary/Function',
        },
        {
          title: 'Operator',
          path: '/en-US/docs/Glossary/Operator',
          slug: 'Glossary/Operator',
        },
        {
          title: 'Statement',
          path: '/en-US/docs/Glossary/Statement',
          slug: 'Glossary/Statement',
        },
        {
          title: 'Expression',
          path: '/en-US/docs/Glossary/Expression',
          slug: 'Glossary/Expression',
        },
        {
          title: 'Keyword',
          path: '/en-US/docs/Glossary/Keyword',
          slug: 'Glossary/Keyword',
        },
        {
          title: 'Property',
          path: '/en-US/docs/Glossary/Property',
          slug: 'Glossary/Property',
        },
        {
          title: 'Event',
          path: '/en-US/docs/Glossary/Event',
          slug: 'Glossary/Event',
        },
        {
          title: 'Method',
          path: '/en-US/docs/Glossary/Method',
          slug: 'Glossary/Method',
        },
        {
          title: 'Interface',
          path: '/en-US/docs/Glossary/Interface',
          slug: 'Glossary/Interface',
        },
        {
          title: 'Array.prototype.map()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/map',
        },
        {
          title: 'Array.prototype.filter()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/filter',
        },
        {
          title: 'Array.prototype.reduce()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/reduce',
        },
        {
          title: 'Array.prototype.forEach()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/forEach',
        },
        {
          title: 'Array.prototype.every()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/every',
        },
        {
          title: 'Array.prototype.some()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/some',
        },
        {
          title: 'Array.prototype.indexOf()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/indexOf',
        },
        {
          title: 'Array.prototype.lastIndexOf()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf',
        },
        {
          title: 'Array.prototype.includes()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/includes',
        },
        {
          title: 'Array.prototype.find()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/find',
        },
        {
          title: 'Array.prototype.findIndex()',
          path: '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
          slug: 'Web/JavaScript/Reference/Global_Objects/Array/findIndex',
        },
      ],
    },
  }).lookup('GlossarySidebar');

  t.snapshot(GlossarySidebar());

  t.timeout(200);
});
