import domxrefMacro from './domxref.js';

const tableTitle = 'Методи DOM, що працюють з атрибутами елемента:';
const tableHead1 =
  'Найбільш загальновживані методи, що не враховують області імен';
const tableHead2 = 'Варіанти, що враховують області імен (DOM рівня 2)';
const tableHead3 =
  'Методи DOM рівня 1 для безпосередньої роботи з вузлами <code>Attr</code> (рідковживані)';
const tableHead4 =
  'Методи DOM рівня 2, що враховують області імен, для безпосередньої роботи з вузлами <code>Attr</code> (рідковживані)';

export default function DomAttributeMethods() {
  const domxref = domxrefMacro.bind(this);
  return `<p>${tableTitle}</p>
    <table class="standard-table">
        <thead>
            <tr>
            <th>${tableHead1}</th>
            <th>${tableHead2}</th>
            <th>${tableHead3}</th>
            <th>${tableHead4}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${domxref('element.setAttribute', 'setAttribute')} (DOM 1)</td>
            <td>${domxref('element.setAttributeNS', 'setAttributeNS')}</td>
            <td>${domxref('element.setAttributeNode', 'setAttributeNode')}</td>
            <td>${domxref(
              'element.setAttributeNodeNS',
              'setAttributeNodeNS'
            )}</td>
            </tr>
            <tr>
            <td>${domxref('element.getAttribute', 'getAttribute')} (DOM 1)</td>
            <td>${domxref('element.getAttributeNS', 'getAttributeNS')}</td>
            <td>${domxref('element.getAttributeNode', 'getAttributeNode')}</td>
            <td>${domxref(
              'element.getAttributeNodeNS',
              'getAttributeNodeNS'
            )}</td>
            </tr>
            <tr>
            <td>${domxref('element.hasAttribute', 'hasAttribute')} (DOM 2)</td>
            <td>${domxref('element.hasAttributeNS', 'hasAttributeNS')}</td>
            <td>-</td>
            <td>-</td>
            </tr>
            <tr>
            <td>${domxref(
              'element.removeAttribute',
              'removeAttribute'
            )} (DOM 1)</td>
            <td>${domxref(
              'element.removeAttributeNS',
              'removeAttributeNS'
            )}</td>
            <td>${domxref(
              'element.removeAttributeNode',
              'removeAttributeNode'
            )}</td>
            <td>-</td>
            </tr>
        </tbody>
    </table>`;
}
