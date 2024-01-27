// TODO: put proper anchors
export const s_named_color_link = '/docs/Web/CSS/color_value#imenovani-kolory';
export const s_system_color_link = '/docs/Web/CSS/color_value#systemni-kolory';
export const s_where = 'де ';
export const s_syntax_value_definition = 'Value_definition_syntax';
const s_or = 'або';
const s_possible_values = 'Можливі значення: ';
const s_number_followed_by = 'число, за яким слідує ';
const s_like = 'наприклад: ';

export const typeInfo = {
  angle: {
    title: `${
      s_possible_values + s_number_followed_by
    }'deg', 'grad', 'rad' ${s_or} 'turn', ${s_like} 2turn, 1.3rad, -60deg ${s_or} 0grad.`,
  },
  'blend-mode': {
    title: `${s_possible_values}normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity`,
  },
  color: {
    typeLinkName: 'color_value',
  },
  'custom-ident': {},
  'filter-function': {
    title: `${s_possible_values}blur(), brightness(), contrast(), drop-shadow(), grayscale(), hue-rotate(), invert(), opacity(), saturate(), sepia()`,
  },
  flex: {
    typeLinkName: 'flex_value',
  },
  frequency: {},
  ident: {},
  image: {},
  integer: {},
  length: {
    title: `${
      s_possible_values + s_number_followed_by
    }'em', 'ex', 'ch', 'rem', 'px', 'cm', 'mm', 'in', 'vh', 'vw', 'vmin', 'vmax', 'pt', 'pc' ${s_or} 'px', ${s_like} 3px, 1.5cm, -0.5em ${s_or} 0`,
  },
  number: {},
  percentage: {},
  position: {
    typeLinkName: 'position_value',
  },
  resolution: {},
  'single-transition-timing-function': {
    title: `${s_possible_values}cubic-bezier(), steps(), linear, ease, ease-in, ease-out, east-in-out, step-start-step-end`,
  },
  string: {},
  time: {
    title: `${
      s_possible_values + s_number_followed_by
    }'s' ${s_or} 'ms', ${s_like} 3s, -2.5ms ${s_or} 0s.`,
  },
  'timing-function': {
    title: `${s_possible_values}cubic-bezier(), steps(), linear, ease, ease-in, ease-out, east-in-out, step-start-step-end`,
  },
  url: {},
  uri: {},
  'transform-function': {
    title: `${s_possible_values}matrix(), matrix3d(), rotate(), rotate3d(), rotateX(), rotateY(), rotateZ(), scale(), scale3d(), scaleX(), scaleY(), scaleZ(), skewX(), skewY(), translate(), translate3d(), translateX(), translateY(), translateZ()`,
  },
};
export const operators = [
  {
    regexp: /#/g,
    title:
      'Знак решітки: значення повторюється один або декілька разів, кожне з яких відділяється комою',
    anchor: 'znak-reshitky-',
  },
  {
    regexp: /\|\|/g,
    title:
      'Подвійна вертикальна риска: може бути присутнім одне чи декілька значень, у будь-якій послідовності',
    anchor: 'podviina-ryska',
  },
  {
    regexp: /[^|](\|)[^|]/g,
    title: 'Одинарна вертикальна риска: повинно бути точно одне зі значень',
    anchor: 'odynarna-ryska',
  },
  {
    regexp: /&&/g,
    title:
      'Подвійний амперсанд: всі значення мають бути присутні, байдуже в якій послідовності',
    anchor: 'podviinyi-ampersand',
  },
  {
    regexp: /\?/g,
    title: "Знак питання: значення необов'язкове",
    anchor: 'znak-pytannia-',
  },
  {
    regexp: /([^/])\*(?!\/)/g,
    title: 'Зірочка: значення може траплятися 0, 1 чи декілька разів',
    anchor: 'zirochka-',
  },
  {
    regexp: /\+/g,
    title: 'Плюс: значення може траплятися 1 чи декілька разів',
    anchor: 'plius-',
  },
  {
    regexp: /(\[])(?![^<]*>)/g,
    title:
      "Квадратні дужки: об'єднують декілька значень, комбінаторів чи множників для перетворення їх на єдиний компонент",
    anchor: 'kvadratni-duzhky',
  },
  {
    regexp: /{(?!\s)|(\d)}/g,
    title:
      "Фігурні дужки: об'єднують два цілих числа, визначаючи найменшу і найбільшу кількість входжень певного значення",
    anchor: 'fihurni-duzhky--',
  },
  {
    regexp: /!/g,
    title: 'Знак оклику: група повинна вивести принаймні одне значення',
    anchor: 'znak-oklyku-',
  },
];
