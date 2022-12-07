import labels from './labels';

function quickLinksSections() {
  const {
    env: { path: currentPath, targetLocale },
    registry,
  } = this;
  const completeBeginners = [
    {
      slug: `Learn/Getting_started_with_the_web/JavaScript_basics`,
      title: labels.Basics,
    },
    {
      slug: `Learn/JavaScript/First_steps`,
      title: labels.First_steps,
    },
    {
      slug: `Learn/JavaScript/Building_blocks`,
      title: labels.Building_blocks,
    },
    {
      slug: `Learn/JavaScript/Objects`,
      title: labels.Introducing_objects,
    },
  ];

  const guide = [
    {
      slug: `Web/JavaScript/Guide/Introduction`,
      title: labels.Guide_Introduction,
    },
    {
      slug: `Web/JavaScript/Guide/Grammar_and_Types`,
      title: labels.Guide_Grammar,
    },
    {
      slug: `Web/JavaScript/Guide/Control_flow_and_error_handling`,
      title: labels.Guide_Control_flow,
    },
    {
      slug: `Web/JavaScript/Guide/Loops_and_iteration`,
      title: labels.Guide_Loops,
    },
    {
      slug: `Web/JavaScript/Guide/Functions`,
      title: labels.Guide_Functions,
    },
    {
      slug: `Web/JavaScript/Guide/Expressions_and_Operators`,
      title: labels.Guide_Expressions,
    },
    {
      slug: `Web/JavaScript/Guide/Numbers_and_dates`,
      title: labels.Guide_Numbers,
    },
    {
      slug: `Web/JavaScript/Guide/Text_formatting`,
      title: labels.Guide_Text,
    },
    {
      slug: `Web/JavaScript/Guide/Regular_Expressions`,
      title: labels.Guide_RegExp,
    },
    {
      slug: `Web/JavaScript/Guide/Indexed_collections`,
      title: labels.Guide_Indexed_collections,
    },
    {
      slug: `Web/JavaScript/Guide/Keyed_collections`,
      title: labels.Guide_keyed_collections,
    },
    {
      slug: `Web/JavaScript/Guide/Working_with_Objects`,
      title: labels.Guide_Objects,
    },
    {
      slug: `Web/JavaScript/Guide/Details_of_the_Object_Model`,
      title: labels.Guide_OOP,
    },
    {
      slug: `Web/JavaScript/Guide/Using_promises`,
      title: labels.Guide_promises,
    },
    {
      slug: `Web/JavaScript/Guide/Iterators_and_generators`,
      title: labels.Guide_Iterators_Generators,
    },
    {
      slug: `Web/JavaScript/Guide/Meta_programming`,
      title: labels.Guide_Meta,
    },
    {
      slug: `Web/JavaScript/Guide/Modules`,
      title: labels.Guide_Modules,
    },
  ];

  const intermediate = [
    {
      slug: `Learn/Tools_and_testing/Client-side_JavaScript_frameworks`,
      title: labels.Frameworks,
    },
    {
      slug: `Learn/JavaScript/Client-side_web_APIs`,
      title: labels['Client-side_APIs'],
    },
    {
      slug: `Web/JavaScript/A_re-introduction_to_JavaScript`,
      title: labels['Re-introduction'],
    },
    {
      slug: `Web/JavaScript/Data_structures`,
      title: labels.Data_structures,
    },
    {
      slug: `Web/JavaScript/Equality_comparisons_and_sameness`,
      title: labels.Equality,
    },
    {
      slug: `Web/JavaScript/Closures`,
      title: labels.Closures,
    },
  ];

  const advanced = [
    {
      slug: `Web/JavaScript/Inheritance_and_the_prototype_chain`,
      title: labels.Inheritance,
    },
    {
      slug: `Web/JavaScript/Reference/Strict_mode`,
      title: labels.Strict_mode,
    },
    {
      slug: `Web/JavaScript/Typed_arrays`,
      title: labels.Typed_arrays,
    },
    {
      slug: `Web/JavaScript/Memory_Management`,
      title: labels.Memory_Management,
    },
    {
      slug: `Web/JavaScript/EventLoop`,
      title: labels.Event_Loop,
    },
  ];

  return [
    {
      title: labels.Complete_beginners,
      items: completeBeginners.map((item) => ({
        ...item,
        path: `/${targetLocale}/docs/${item.slug}`,
        hasLocalizedContent: registry.hasPage(item.slug, true),
      })),
      expanded: completeBeginners.some(({ slug }) => `/${targetLocale}/docs/${slug}` === currentPath),
    },
    {
      title: labels.Guide,
      items: guide.map((item) => ({
        ...item,
        path: `/${targetLocale}/docs/${item.slug}`,
        hasLocalizedContent: registry.hasPage(item.slug, true),
      })),
      expanded: guide.some(({ slug }) => `/${targetLocale}/docs/${slug}` === currentPath),
    },
    {
      title: labels.Intermediate,
      items: intermediate.map((item) => ({
        ...item,
        path: `/${targetLocale}/docs/${item.slug}`,
        hasLocalizedContent: registry.hasPage(item.slug, true),
      })),
      expanded: intermediate.some(({ slug }) => `/${targetLocale}/docs/${slug}` === currentPath),
    },
    {
      title: labels.Advanced,
      items: advanced.map((item) => ({
        ...item,
        path: `/${targetLocale}/docs/${item.slug}`,
        hasLocalizedContent: registry.hasPage(item.slug, true),
      })),
      expanded: advanced.some(({ slug }) => `/${targetLocale}/docs/${slug}` === currentPath),
    },
  ];
}

export default quickLinksSections;
