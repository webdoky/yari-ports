import generalLinks from './section-general';
import { groupData, inheritanceData } from './static';

const labels = {
  properties: 'Властивості',
  methods: 'Методи',
};

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

function jsReferenceMacro() {
  const { registry, slug, path: currentPagePath, targetLocale } = this;
  const pages = Array.from(registry.getPagesData());

  let objectName = slug
    .replace('Web/JavaScript/Reference/Global_Objects/', '')
    .split('/')[0];

  // TODO: generalize this?
  // Exceptions, we want the main object in the sidebar (e.g. Int8Array -> TypedArray)
  if (groupData.TypedArray.includes(objectName)) {
    objectName = 'TypedArray';
  }
  if (groupData.Error.includes(objectName)) {
    objectName = 'Error';
  }
  if (groupData.Proxy.includes(objectName)) {
    objectName = 'Proxy/handler';
  }

  const inheritance = inheritanceData[objectName] || inheritanceData.default;

  let group = [];
  for (const groupValue of Object.values(groupData)) {
    const index = groupValue.indexOf(objectName);
    if (index !== -1) {
      group = groupValue;
      group.splice(index, 1);
      break;
    }
  }

  const source = {};
  const navigationStructure = {};
  const globalObjectsPages = pages.filter(({ path }) =>
    path.includes(
      `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects`,
    ),
  );
  source[objectName] = globalObjectsPages.filter(({ path }) =>
    path.includes(
      `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/${objectName}/`,
    ),
  );
  navigationStructure[objectName] = {
    title: objectName,
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
      methods: [],
      properties: [],
    };
  }

  let pageList;
  let isObject;
  let includeme;

  for (const object of Object.keys(source)) {
    pageList = source[object];
    if (object === 'iObject') {
      isObject = true;
    }
    for (const aPage of Object.keys(pageList)) {
      includeme = isObject
        ? pageList[aPage].data.tags?.includes('Prototype')
        : true;

      if (pageList[aPage].data.tags?.includes('Property') && includeme) {
        navigationStructure[object].properties.push(pageList[aPage]);
      }

      if (pageList[aPage].data.tags?.includes('Method') && includeme) {
        navigationStructure[object].methods.push(pageList[aPage]);
      }
    }
  }

  const { properties, methods } = navigationStructure[objectName];
  const { properties: objectProperties, methods: objectMethods } =
    navigationStructure.iObject || {};
  const { properties: functionProperties, methods: functionMethods } =
    navigationStructure.iFunction || {};

  const pageToNavItem = ({ path, data: { title } }) => ({
    title,
    path,
    isCurrent: path === currentPagePath,
  });

  return [
    {
      sections: generalLinks(this, objectName),
    },
    {
      sections: [
        {
          title: labels.properties,
          items: properties
            .map((item) => pageToNavItem(item))
            .sort(sortByTitle),
          expanded: properties.find(({ path }) => path === currentPagePath),
        },
        {
          title: labels.methods,
          items: methods.map((item) => pageToNavItem(item)).sort(sortByTitle),
          expanded: methods.find(({ path }) => path === currentPagePath),
        },
      ],
    },
    {
      title: 'Успадковані властивості',
      groupItems: [
        {
          title: 'Функція',
          sections: objectProperties
            ? [
                {
                  title: labels.properties,
                  items: objectProperties
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: objectProperties.find(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.methods,
                  items: objectMethods
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: objectMethods.find(
                    ({ path }) => path === currentPagePath,
                  ),
                },
              ]
            : [],
        },
        {
          title: "Об'єкт",
          sections: functionProperties
            ? [
                {
                  title: labels.properties,
                  items: functionProperties
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: functionProperties.find(
                    ({ path }) => path === currentPagePath,
                  ),
                },
                {
                  title: labels.methods,
                  items: functionMethods
                    .map((item) => pageToNavItem(item))
                    .sort(sortByTitle),
                  expanded: functionMethods.find(
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
