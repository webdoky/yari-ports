// Note: this is a verbatim from @mdn/yari/markdown/m2h/handlers/dl.js
import { u } from 'unist-builder';

const DEFINITION_PREFIX = ': ';

function all(h, parent) {
  const nodes = parent.children || [];
  let values = [];
  let result;
  let head;

  for (const node of nodes) {
    // eslint-disable-next-line no-use-before-define
    result = one(h, node, parent);

    if (result) {
      if (node.type === 'break') {
        if (result.type === 'text') {
          result.value = result.value.replace(/^\s+/, '');
        }

        if (result.type === 'element') {
          [head] = result.children;

          if (head && head.type === 'text') {
            head.value = head.value.replace(/^\s+/, '');
          }
        }
      }

      values = values.concat(result);
    }
  }

  return values;
}

function text(node) {
  const data = node.data || {};

  if ('hName' in data || 'hProperties' in data || 'hChildren' in data) {
    return false;
  }

  return 'value' in node;
}

function returnNode(h, node) {
  return node.children ? { ...node, children: all(h, node) } : node;
}

function unknown(h, node) {
  if (text(node)) {
    return h.augment(node, u('text', node.value));
  }

  return h(node, 'div', all(h, node));
}
function one(h, node, parent) {
  const type = node && node.type;
  let callback;

  if (!type) {
    throw new Error(`Expected node, got \`${node}\``);
  }

  if (type in h.handlers) {
    callback = h.handlers[type];
  } else if (h.passThrough && h.passThrough.includes(type)) {
    callback = returnNode;
  } else {
    callback = h.unknownHandler;
  }

  return (typeof callback === 'function' ? callback : unknown)(h, node, parent);
}

function wrap(nodes, loose) {
  const result = [];

  if (loose) {
    result.push(u('text', '\n'));
  }
  let index = 0;

  while (index < nodes.length) {
    if (index) result.push(u('text', '\n'));
    result.push(nodes[index]);
    index += 1;
  }

  if (loose && nodes.length > 0) {
    result.push(u('text', '\n'));
  }

  return result;
}

function isDefinitionList(node) {
  return (
    !node.ordered &&
    node.children.every((listItem) => {
      if (!listItem.children || listItem.children.length < 2) {
        return false;
      }
      const definitions = listItem.children[listItem.children.length - 1];
      return (
        definitions.type === 'list' &&
        definitions.children.length === 1 &&
        definitions.children.every((definition) => {
          const [paragraph] = definition.children || [];
          return (
            paragraph &&
            paragraph.type === 'paragraph' &&
            paragraph.children &&
            paragraph.children[0] &&
            (paragraph.children[0].value || '').startsWith(DEFINITION_PREFIX)
          );
        })
      );
    })
  );
}

function asDefinitionList(h, node) {
  const children = node.children.flatMap((listItem) => {
    const terms = listItem.children.slice(0, -1);
    const definition =
      listItem.children[listItem.children.length - 1].children[0];
    const [paragraph, ...rest] = definition.children;
    paragraph.children[0].value = paragraph.children[0].value.slice(
      DEFINITION_PREFIX.length,
    );
    return [
      h(
        node,
        'dt',
        {},
        all(h, {
          ...node,
          children:
            terms.length === 1 && terms[0].type === 'paragraph'
              ? terms[0].children
              : terms,
        }),
      ),
      h(
        node,
        'dd',
        {},
        all(h, { ...definition, children: [paragraph, ...rest] }),
      ),
    ];
  });
  return h(node, 'dl', {}, wrap(children, true));
}

export { asDefinitionList, DEFINITION_PREFIX, isDefinitionList };
