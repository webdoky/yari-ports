// Note! This is in many ways copied verbatim from @mdn/yari

import deprecatedIcon from '../../../../icons/delete-bin';
import experimentalIcon from '../../../../icons/flask-fill';
import nonStandardIcon from '../../../../icons/thumbsdown';

import { browserName, browserPreviewName } from './browser-name';

// const bcd = readJsonDependency('@mdn/browser-compat-data/data.json');

function getFirst(a) {
  return Array.isArray(a) ? a[0] : a;
}

export function asList(a) {
  return Array.isArray(a) ? a : [a];
}

function getSupportClassName(support) {
  if (!support) {
    return 'unknown';
  }

  const { flags, version_added, version_removed, partial_implementation } =
    getFirst(support);

  let className;
  if (version_added === null) {
    className = 'unknown';
  } else if (version_added === 'preview') {
    className = 'preview';
  } else if (version_added) {
    className = 'yes';
    if (version_removed || (flags && flags.length > 0)) {
      className = 'no';
    }
  } else {
    className = 'no';
  }
  if (partial_implementation && !version_removed) {
    className = 'partial';
  }

  return className;
}

function getSupportBrowserReleaseDate(support) {
  if (!support) {
    return;
  }
  return getFirst(support).release_date;
}

function statusIcons({ status }) {
  const icons = [
    status.experimental && {
      title: 'Експериментальне. Варто очікувати змін цієї функціональності в майбутньому.',
      text: 'Експериментальне',
      icon: experimentalIcon,
    },
    status.deprecated && {
      title: 'Нерекомендоване. Не для застосування в нових вебсайтах.',
      text: 'Нерекомендоване',
      icon: deprecatedIcon,
    },
    !status.standard_track && {
      title: 'Нестандартне. Слід розраховувати на погану міжбраузерну підтримку.',
      text: 'Нестандартне',
      icon: nonStandardIcon,
    },
  ].filter(Boolean);

  return icons.length === 0
    ? ''
    : `<div class="bc-icons">
      ${icons
        .map(
          (iconItem) => `<abbr class="only-icon" title="${iconItem.title}">
          <span>${iconItem.text}</span>
          ${iconItem.icon}
        </abbr>`,
        )
        .join('')}
    </div>`.trim();
}

function labelFromString(version, browser) {
  if (typeof version !== 'string') {
    return '?';
  }
  // Treat BCD ranges as exact versions to avoid confusion for the reader
  // See https://github.com/mdn/yari/issues/3238
  if (version.startsWith('≤')) {
    return `${version.slice(1)}`;
  }
  if (version === 'preview') {
    return browserPreviewName(browser);
  }
  return version;
}

function cellText({ support, browser }) {
  const currentSupport = getFirst(support);

  const added = currentSupport && currentSupport.version_added;
  const removed = currentSupport && currentSupport.version_removed;

  let status;

  switch (added) {
    case null: {
      status = { isSupported: 'unknown' };
      break;
    }
    case true: {
      status = { isSupported: 'yes' };
      break;
    }
    case false: {
      status = { isSupported: 'no' };
      break;
    }
    case 'preview': {
      status = { isSupported: 'preview' };
      break;
    }
    default: {
      status = { isSupported: 'yes', label: labelFromString(added, browser) };
      break;
    }
  }

  if (removed) {
    status = {
      isSupported: 'no',
      label: `
          ${labelFromString(added, browser)}&#8202;&ndash;&#8202;
          ${labelFromString(removed, browser)}`,
    };
  } else if (currentSupport && currentSupport.partial_implementation) {
    status = {
      isSupported: 'partial',
      label:
        typeof added === 'string' ? labelFromString(added, browser) : 'Partial',
    };
  }

  let label;
  let title = '';
  switch (status.isSupported) {
    case 'yes': {
      title = 'Full support';
      label = status.label || 'Так';
      break;
    }

    case 'partial': {
      title = 'Partial support';
      label = status.label || 'Частково';
      break;
    }

    case 'no': {
      title = 'No support';
      label = status.label || 'Ні';
      break;
    }

    case 'preview': {
      title = 'Попередній перегляд браузерної підтримки';
      label = browserPreviewName(browser);
      break;
    }

    case 'unknown': {
      title = 'Сумісність невідома; будь ласка, оновіть.';
      label = '?';
      break;
    }
    default:
  }

  return `<abbr class="bc-level-${getSupportClassName(
    currentSupport,
  )} only-icon" title="${title}">
        <span>${title}</span>
      </abbr>
      <span>${label}</span>`;
}

function icon({ name }) {
  return `<abbr class="only-icon" title="${name}">
      <span>${name}</span>
      <i class="ic-${name}" />
    </abbr>`;
}

function cellIcons({ support }) {
  const supportItem = getFirst(support);
  if (!supportItem) {
    return null;
  }
  return `<div class="bc-icons">${
    supportItem.prefix ? icon({ name: 'prefix' }) : ''
  }${supportItem.alternative_name ? icon({ name: 'altname' }) : ''}${
    supportItem.flags ? icon({ name: 'disabled' }) : ''
  }${supportItem.notes ? icon({ name: 'footnote' }) : ''}</div>`;
}

/* function flagsNote({ supportItem, browser }) {
  const { browsers: browserInfo } = bcd;
  if (!browserInfo) {
    throw new Error('Missing browser info');
  }
  const info = browserInfo[browser];

  const hasAddedVersion = typeof supportItem.version_added === 'string';
  const hasRemovedVersion = typeof supportItem.version_removed === 'string';
  const flags = supportItem.flags || [];
  return `
    ${hasAddedVersion ? `From version ${supportItem.version_added}` : ''}
    ${
      hasRemovedVersion
        ? `
      ${hasAddedVersion ? ' until' : 'Until'} version${' '}
      ${supportItem.version_removed} (exclusive)`
        : ''
    }
    ${
      hasAddedVersion || hasRemovedVersion ? ': this' : 'This'
    } feature is behind the
    ${flags
      .map((flag, index) => {
        const valueToSet = flag.value_to_set
          ? ` (needs to be set to <code>${flag.value_to_set}</code>)`
          : '';
        return `<code>${flag.name}</code>${
          flag.type === 'preference' ? `preferences${valueToSet}` : ''
        }${flag.type === 'runtime_flag' ? `runtime flag${valueToSet}` : ''}${
          index < flags.length - 1 ? ' and the ' : ''
        }`;
      })
      .join('')}.${
    info.pref_url && flags.some((flag) => flag.type === 'preference')
      ? ` To change preferences in ${info.name}, visit ${info.pref_url}.`
      : ''
  }`;
} */

/* function getNotes(browser, support) {
  return asList(support)
    .flatMap((item, index) => {
      const supportNotes = [
        item.version_removed
          ? {
              iconName: 'footnote',
              label: `
                Removed in ${labelFromString(
                  item.version_removed,
                  browser,
                )} and later`,
            }
          : null,
        item.partial_implementation
          ? {
              iconName: 'footnote',
              label: 'Partial support',
            }
          : null,
        item.prefix
          ? {
              iconName: 'footnote',
              label: `Implemented with the vendor prefix: ${item.prefix}`,
            }
          : null,
        item.alternative_name
          ? {
              iconName: 'footnote',
              label: `Alternate name: ${item.alternative_name}`,
            }
          : null,
        item.flags
          ? {
              iconName: 'footnote',
              label: flagsNote({ browser, supportItem: item }),
            }
          : null,
        item.notes
          ? (Array.isArray(item.notes) ? item.notes : [item.notes]).map(
              (note) => ({ iconName: 'footnote', label: note }),
            )
          : null,
        item.version_added === 'preview'
          ? {
              iconName: 'footnote',
              label: 'Preview browser support',
            }
          : null,
        // If we encounter nothing else than the required `version_added` and
        // `release_date` properties, assume full support
        Object.keys(item).filter(
          (x) => !['version_added', 'release_date'].includes(x),
        ).length === 0 && item.version_added !== 'preview'
          ? {
              iconName: 'footnote',
              label: 'Full support',
            }
          : null,
      ]
        .flat()
        .filter(Boolean);

      const hasNotes = supportNotes.length > 0;
      return (
        (index === 0 || hasNotes) &&
        `<div class="bc-notes-wrapper">
            <dt class="bc-supports-${getSupportClassName(item)} bc-supports">
              ${cellText({ support: item, browser })}
              ${cellIcons({ support: item })}
            </dt>
            ${supportNotes
              .map(({ iconName, label }, index) => {
                return `
                <dd>
                  ${icon({ name: iconName })}{" "}
                  ${typeof label === 'string' ? `<span>${label}</span>` : label}
                </dd>`;
              })
              .join('')}
            ${!hasNotes && '<dd />'}
          </div>`
      );
    })
    .filter(Boolean);
} */

function compatCell({ browser, support /* , showNotes */ }) {
  const supportClassName = getSupportClassName(support);
  const browserReleaseDate = getSupportBrowserReleaseDate(support);
  // Whenever the support statement is complex (array with more than one entry)
  // or if a single entry is complex (prefix, notes, etc.),
  // we need to render support details in `bc-history`
  const hasNotes =
    support &&
    (asList(support).length > 1 ||
      asList(support).some(
        (item) =>
          item.prefix || item.notes || item.alternative_name || item.flags,
      ));
  return `<td class="bc-browser-${browser} bc-supports-${supportClassName} ${
    hasNotes ? 'bc-has-history' : ''
  }" title="${browserReleaseDate ? `Випущено ${browserReleaseDate}` : ''}">
      <span class="bc-browser-name">
        ${browserName(browser)}
      </span>${cellText({ support, browser })}${cellIcons({ support })}${
    // hasNotes
    //   ? `
    // <button type="button" title="Open implementation notes" class="bc-history-link only-icon ${
    //   showNotes ? 'bc-history-link-inverse' : ''
    // }">
    //   <span>Open</span>
    //   <i class="ic-history" aria-hidden="true" />
    // </button>`
    //   : ''
    ''
  }${
    // showNotes
    //   ? `
    // <dl class="bc-notes-list bc-history bc-history-mobile">
    //   ${getNotes(browser, support)}
    // </dl>`
    //   : ''
    ''
  }
    </td>`.trim();
}

function featureRow({ /* index, */ feature, browsers, activeCell }) {
  const { name, compat, isRoot } = feature;
  const title = compat.description
    ? `<span>${compat.description}</span>`
    : `<code>${name}</code>`;

  let titleNode;
  const webDocumentUrl = compat.mdn_url
    ? compat.mdn_url.replace('developer.mozilla.org/', 'webdoky.org/uk/')
    : undefined;

  if (compat.bad_url && webDocumentUrl) {
    titleNode = `<div class="bc-table-row-header">
          <abbr class="new" title="${webDocumentUrl} не існує">
            ${title}
          </abbr>
          ${compat.status && statusIcons({ status: compat.status })}</div>`;
  } else if (webDocumentUrl && !isRoot) {
    titleNode = `<a href="${webDocumentUrl}" class="bc-table-row-header">
          ${title}
          ${compat.status && statusIcons({ status: compat.status })}</a>`;
  } else {
    titleNode = `<div class="bc-table-row-header">
          ${title}
          ${compat.status && statusIcons({ status: compat.status })}</div>`;
  }

  return `<tr>
        <th scope="row">${titleNode}</th>
        ${browsers
          .map((browser, index_) =>
            compatCell({
              browser,
              support: compat.support[browser],
              showNotes: activeCell === index_,
            }),
          )
          .join('')}
      </tr>`.trim();
}

export default featureRow;
