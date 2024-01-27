import LABELS from './labels';

const TUTORIALS = [
  {
    slug: 'Web/SVG/Tutorial/Introduction',
    title: 'Знайомство',
  },
  {
    slug: 'Web/SVG/Tutorial/Getting_Started',
    title: 'Початок роботи',
  },
  {
    slug: 'Web/SVG/Tutorial/Positions',
    title: 'Позиції',
  },
  {
    slug: 'Web/SVG/Tutorial/Basic_Shapes',
    title: 'Базові фігури',
  },
  {
    slug: 'Web/SVG/Tutorial/Paths',
    title: 'Треки',
  },
  {
    slug: 'Web/SVG/Tutorial/Fills_and_Strokes',
    title: 'Заповнення та контури',
  },
  {
    slug: 'Web/SVG/Tutorial/Gradients',
    title: 'Градієнти в SVG',
  },
  {
    slug: 'Web/SVG/Tutorial/Patterns',
    title: 'Патерни',
  },
  {
    slug: 'Web/SVG/Tutorial/Texts',
    title: 'Тексти',
  },
  {
    slug: 'Web/SVG/Tutorial/Basic_Transformations',
    title: 'Базові перетворення',
  },
  {
    slug: 'Web/SVG/Tutorial/Clipping_and_Masking',
    title: 'Обрізання та маскування',
  },
  {
    slug: 'Web/SVG/Tutorial/Other_content_in_SVG',
    title: 'Інший вміст у SVG',
  },
  {
    slug: 'Web/SVG/Tutorial/Filter_effects',
    title: 'Фільтри',
  },
  {
    slug: 'Web/SVG/Tutorial/SVG_fonts',
    title: 'Шрифти SVG',
  },
  {
    slug: 'Web/SVG/Tutorial/SVG_Image_Tag',
    title: 'Елемент зображення SVG',
  },
  {
    slug: 'Web/SVG/Tutorial/Tools_for_SVG',
    title: 'Інструменти для роботи з SVG',
  },
  {
    slug: 'Web/SVG/Tutorial/SVG_and_CSS',
    title: 'SVG та CSS',
  },
];

export default function SvgTutorials() {
  const {
    env: { path: currentPath, targetLocale },
    registry,
  } = this;
  const pageToNavItem = ({ path, slug, title }) => ({
    hasLocalizedContent: registry.hasPage(slug, true),
    isCurrent: path === currentPath,
    path,
    title,
  });
  const tutorials = TUTORIALS.map((item) => ({
    ...item,
    path: `/${targetLocale}/docs/${item.slug}`,
  })).map((item) => pageToNavItem(item));
  return [
    {
      expanded: tutorials.some(({ isCurrent }) => isCurrent),
      items: tutorials,
      title: LABELS['Introducing SVG from scratch'],
    },
  ];
}
