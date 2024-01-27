import generalLinks from './section-general';
import { groupData, inheritanceData } from './static';

const labels = {
  Constructor: 'Конструктор',
  Properties: 'Властивості',
  Methods: 'Методи',
};

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

function jsReferenceMacro() {
  const {
    registry,
    env: { slug, path: currentPagePath, targetLocale },
  } = this;
  const pages = Array.from(registry.getPagesData());

  const subPath = slug.replace('Web/JavaScript/Reference/Global_Objects/', '');
  let subPathParts = subPath.split('/');
  // For Intl, we should use the first two parts of the slug if has
  // e.g. subPath startswith "Intl/Collator" we should use "Intl.Collator"
  // note that Intl owns some methods, we have some special handling for it later
  subPathParts = subPathParts.slice(0, subPathParts[0] === 'Intl' ? 2 : 1);
  let mainObject = subPathParts.join('.');

  const inheritance = inheritanceData[mainObject.split('.')[0]] ?? [
    'Object',
    'Function',
  ];

  // Exceptions, we want the main object in the sidebar (e.g. Int8Array -> TypedArray)
  if (groupData.TypedArray.includes(mainObject)) {
    mainObject = 'TypedArray';
  } else if (groupData.Error.includes(mainObject)) {
    mainObject = 'Error';
  } else if (groupData.Proxy.includes(mainObject)) {
    mainObject = 'Proxy/handler';
  } else if (
    mainObject.startsWith('Intl') &&
    !groupData.Intl.includes(mainObject)
  ) {
    // Special case for Intl, we should make sure that the main object is Intl
    // as Intl owns some methods (e.g. Intl.getCanonicalLocales)
    mainObject = 'Intl';
  }

  // Get related pages from groups and exclude self
  let group = [];
  for (const key in groupData) {
    const index = groupData[key].indexOf(mainObject);
    if (index !== -1) {
      group = groupData[key];
      group.splice(index, 1);
      break;
    }
  }

  const mainObjectPath = mainObject.replaceAll('.', '/'); // e.g. Intl.Collator -> Intl/Collator

  const source = {};
  const navigationStructure = {};
  const globalObjectsPages = pages.filter(({ path }) =>
    path.includes(
      `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects`,
    ),
  );
  source[mainObject] = globalObjectsPages.filter(({ path }) =>
    path.includes(
      `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/${mainObjectPath}/`,
    ),
  );
  navigationStructure[mainObject] = {
    title: mainObject,
    constructors: [],
    methods: [],
    properties: [],
  };
  if (inheritance.includes('Function')) {
    source.iFunction = globalObjectsPages.filter(({ path }) =>
      path.includes(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/Function`,
      ),
    );
    navigationStructure.iFunction = {
      title: 'Function',
      constructors: [],
      methods: [],
      properties: [],
    };
  }
  if (inheritance.includes('Object')) {
    source.iObject = globalObjectsPages.filter(({ path }) =>
      path.includes(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/Object`,
      ),
    );
    navigationStructure.iObject = {
      title: 'Object',
      constructors: [],
      methods: [],
      properties: [],
    };
  }

  function isPrototypeMemberPage(page) {
    return [
      'javascript-instance-accessor-property',
      'javascript-instance-data-property',
      'javascript-instance-method',
    ].includes(page.pageType);
  }

  function isPropertyPage(page) {
    return [
      'javascript-static-accessor-property',
      'javascript-static-data-property',
      'javascript-instance-accessor-property',
      'javascript-instance-data-property',
    ].includes(page.pageType);
  }

  function isMethodPage(page) {
    return ['javascript-static-method', 'javascript-instance-method'].includes(
      page.pageType,
    );
  }

  function isConstructorPage(page) {
    return page.pageType === 'javascript-constructor';
  }

  for (const key of Object.keys(source)) {
    let pageList = source[key];
    if (key === 'iObject') {
      // For objects, we're only interested in prototype members.
      pageList = pageList.filter((page) => isPrototypeMemberPage(page));
    }
    for (const page of pageList) {
      if (isConstructorPage(page)) {
        navigationStructure[key].constructors.push(page);
      }
      if (isPropertyPage(page)) {
        navigationStructure[key].properties.push(page);
      }
      if (isMethodPage(page)) {
        navigationStructure[key].methods.push(page);
      }
    }
  }

  const { properties, methods, constructors } = navigationStructure[mainObject];
  const {
    properties: objectProperties,
    methods: objectMethods,
    constructors: objectConstructors,
  } = navigationStructure.iObject || {};
  const {
    properties: functionProperties,
    methods: functionMethods,
    constructors: functionConstructors,
  } = navigationStructure.iFunction || {};

  const pageToNavItem = ({ path, title }) => ({
    title,
    path,
    isCurrent: path === currentPagePath,
  });

  return [
    {
      sections: this.callMacro(generalLinks, mainObject),
    },
    {
      sections: [
        {
          title: labels.Constructor,
          items: constructors
            .map((item) => pageToNavItem(item))
            .sort(sortByTitle),
          expanded: properties.some(({ path }) => path === currentPagePath),
        },
        {
          title: labels.Properties,
          items: properties
            .map((item) => pageToNavItem(item))
            .sort(sortByTitle),
          expanded: properties.some(({ path }) => path === currentPagePath),
        },
        {
          title: labels.Methods,
          items: methods.map((item) => pageToNavItem(item)).sort(sortByTitle),
          expanded: methods.some(({ path }) => path === currentPagePath),
        },
      ],
    },
    {
      title: 'Успадковані властивості',
      groupItems: [
        {
          title: 'Функція',
          sections: functionProperties
            ? [
                {
                  title: labels.Constructor,
                  items: functionConstructors
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: functionConstructors.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.Properties,
                  items: functionProperties
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: functionProperties.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.Methods,
                  items: functionMethods
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: functionMethods.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
              ]
            : [],
        },
        {
          title: "Об'єкт",
          sections: objectProperties
            ? [
                {
                  title: labels.Constructor,
                  items: objectConstructors
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: objectConstructors.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.Properties,
                  items: objectProperties
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: objectProperties.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.Methods,
                  items: objectMethods
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: objectMethods.some(
                    ({ path }) => path === currentPagePath,
                  ),
                },
              ]
            : [],
        },
      ],
    },
  ];
}

export default jsReferenceMacro;
