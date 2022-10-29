import htmlEscape from '../utils/html-escape.js';

function sortApis(aParam, bParam) {
  let aSplit = aParam.title.split('.');
  let ax = aSplit[aSplit.length - 1];
  let bSplit = bParam.title.split('.');
  let b = bSplit[bSplit.length - 1];
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

/**
 * API Sidebar
 *
 * @param {A tag for the API group (searches for related APIs)} group
 * @returns {string}
 */
export default function ApiRef(group) {
  // API Sidebar
  //
  // Parameters:
  //  $0  A tag for the API group (searches for related APIs)
  // Variables and data
  const slug = this.env.slug;
  const locale = this.env.targetLocale;
  const apiHref = `/${locale}/docs/Web/API`;
  let output = '';
  let webAPIGroups;
  // slug is not available in preview mode.
  if (slug) {
    let mainIF = slug.replace('Web/API/', '').split('/')[0];
    mainIF = mainIF.charAt(0).toUpperCase() + mainIF.slice(1);
    let hasTag = page.hasTag;
    let webAPIData = this.web.getJSONData('InterfaceData');
    if (group) {
      webAPIGroups = this.web.getJSONData('GroupData');
    }
    // Collect all the things
    let mainIFPages = this.registry.getChildren('/uk/docs/Web/API/' + mainIF);
    let impl =
      webAPIData[0][mainIF] != undefined ? webAPIData[0][mainIF].impl : [];
    let inh =
      webAPIData[0][mainIF] != undefined ? webAPIData[0][mainIF].inh : '';
    let related = [];
    let events = [];
    if (group && webAPIGroups[0][group]) {
      let rel_if = webAPIGroups[0][group].interfaces || [];
      let rel_met = webAPIGroups[0][group].methods || [];
      let rel_prop = webAPIGroups[0][group].properties || [];
      related = rel_if.concat(rel_met, rel_prop);
      let mainIfIndex = related.indexOf(mainIF);
      if (mainIfIndex !== -1) {
        related.splice(mainIfIndex, 1);
      }
      related.sort();
    }
    let staticProperties = [];
    let instanceProperties = [];
    let staticMethods = [];
    let instanceMethods = [];
    let ctors = [];
    let inheritedIF = [];
    let implementedBy = [];
    function collect(pageList) {
      for (let i in pageList) {
        let aPage = pageList[i];
        switch (aPage.pageType) {
          case 'web-api-static-property':
            staticProperties.push(aPage);
            break;
          case 'web-api-instance-property':
            instanceProperties.push(aPage);
            break;
          case 'web-api-static-method':
            staticMethods.push(aPage);
            break;
          case 'web-api-instance-method':
            instanceMethods.push(aPage);
            break;
          case 'web-api-constructor':
            ctors.push(aPage);
            break;
          case 'web-api-event':
            events.push(aPage);
            break;
        }
      }
    }
    collect(mainIFPages);
    if (impl.length > 0) {
      for (let i = 0; i < impl.length; i++) {
        let implementPages = this.registry.getChildren(
          '/uk/docs/Web/API/' + impl[i]
        );
        collect(implementPages);
      }
    }
    staticProperties.sort(sortApis);
    instanceProperties.sort(sortApis);
    staticMethods.sort(sortApis);
    instanceMethods.sort(sortApis);
    ctors.sort(sortApis);
    events.sort(sortApis);
    function getInheritance(inh) {
      if (inh.length > 0) {
        inheritedIF.push(inh);
        if (Object.prototype.hasOwnProperty.call(webAPIData[0], inh)) {
          let inh = webAPIData[0][inh].inh;
          getInheritance(inh);
        }
      }
    }
    getInheritance(inh);
    function getImplementedBy(data) {
      for (let key in data) {
        if (
          Object.prototype.hasOwnProperty.call(data, key) &&
          data[key].impl &&
          data[key].impl.indexOf(mainIF) != -1
        ) {
          implementedBy.push(key);
        }
      }
      implementedBy.sort();
    }
    getImplementedBy(webAPIData[0]);
    // output helpers
    let badges = {
      ExperimentalBadge: ExperimentalBadge(),
      NonStandardBadge: NonStandardBadge(),
      DeprecatedBadge: DeprecatedBadge(),
      ObsoleteBadge: ObsoleteBadge(),
    };
    function buildSublist(pages, title) {
      let result =
        '<li class="toggle"><details open><summary>' + title + '</summary><ol>';
      for (let i in pages) {
        let aPage = pages[i];
        let url = aPage.url.replace('en-US', locale);
        let titleSplit = htmlEscape(aPage.title).split('.'); // Two cases, as sometimes the interface name is forgotten in the title:
        let title = titleSplit[titleSplit.length - 1]; // "WebGLRenderingContext.activeTexture()" and "activeTexture()" should both become "activeTexture()"
        let translated = false;
        if (locale != 'en-US') {
          aPage.translations.forEach(function (translation) {
            if (translation.locale === locale) {
              url = translation.url;
              titleSplit = htmlEscape(translation.title).split('.');
              title = titleSplit[titleSplit.length - 1];
              translated = true;
            }
          });
        }
        // Event pages have a title like "Interface: eventname event" which looks silly
        // in the sidebar. So for event pages we use the slug, which is supposed to be
        // in the form "eventname_event", and split off "_event" to leave us (hopefully)
        // with just "eventname" for the link text.
        if (aPage.pageType === 'web-api-event') {
          title = aPage.slug.split('/').pop();
          if (title.endsWith('_event')) {
            title = title.slice(0, -6);
          }
        }
        result += '<li>';
        let pageBadges = '';
        if (hasTag(aPage, 'Experimental')) {
          pageBadges += badges.ExperimentalBadge;
        }
        if (hasTag(aPage, 'Non-standard') || hasTag(aPage, 'Non Standard')) {
          pageBadges += badges.NonStandardBadge;
        }
        if (hasTag(aPage, 'Deprecated')) {
          pageBadges += badges.DeprecatedBadge;
        }
        if (hasTag(aPage, 'Obsolete')) {
          pageBadges += badges.ObsoleteBadge;
          result += '<s class="obsoleteElement">';
        }
        if (rtlLocales.indexOf(locale) != -1) {
          result += '<bdi>';
        }
        if (slug == aPage.slug) {
          result += '<em>' + pageBadges + ' <code>' + title + '</code></em>';
        } else {
          result +=
            pageBadges +
            web.smartLink(
              url,
              null,
              `<code>${title}</code>`,
              apiHref,
              null,
              'APIRef'
            );
        }
        if (rtlLocales.indexOf(locale) != -1) {
          result += '</bdi>';
        }
        if (hasTag(aPage, 'Obsolete')) {
          result += '</s>';
        }
        result += '</li>';
      }
      result += '</ol></details></li>';
      return result;
    }
    function buildIFList(interfaces, title) {
      let result =
        '<li class="toggle"><details open><summary>' + title + '</summary><ol>';
      for (let i = 0; i < interfaces.length; i++) {
        let url = interfaces[i].replace('()', '').replace('.', '/');
        result += `<li>${web.smartLink(
          apiHref + '/' + url,
          null,
          `<code>${interfaces[i]}</code>`,
          apiHref,
          null,
          'APIRef'
        )}</li>`;
      }
      result += '</ol></details></li>';
      return result;
    }
    // output
    output = '<section id="Quick_links"><ol>';
    if (group && webAPIGroups[0][group] && webAPIGroups[0][group].overview) {
      output += `<li><strong>${web.smartLink(
        apiHref + '/' + webAPIGroups[0][group].overview[0].replace(/ /g, '_'),
        null,
        webAPIGroups[0][group].overview[0],
        apiHref,
        null,
        'APIRef'
      )}</strong></li>`;
    }
    output += `<li><strong>${web.smartLink(
      apiHref + '/' + mainIF,
      null,
      `<code>${mainIF}</code>`,
      apiHref,
      null,
      'APIRef'
    )}</strong></li>`;
    if (ctors.length > 0) {
      output += buildSublist(ctors, 'Конструктор');
    }
    if (staticProperties.length > 0) {
      output += buildSublist(staticProperties, 'Статичні властивості');
    }
    if (instanceProperties.length > 0) {
      output += buildSublist(instanceProperties, 'Властивості примірника');
    }
    if (staticMethods.length > 0) {
      output += buildSublist(staticMethods, 'Статичні методи');
    }
    if (instanceMethods.length > 0) {
      output += buildSublist(instanceMethods, 'Методи примірника');
    }
    if (events.length > 0) {
      output += buildSublist(events, 'Події');
    }
    if (inh.length > 0) {
      output += buildIFList(inheritedIF, 'Успадкування');
    }
    if (implementedBy.length > 0) {
      output += buildIFList(implementedBy, 'Реалізовано в');
    }
    if (related.length > 0) {
      output += buildIFList(related, `Пов'язані з ${group} сторінки`);
    }
    output += '</ol></section>';
  }
  return output;
}
