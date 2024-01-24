import readJsonDependency from '../../read-json-dependency';

const bcd = readJsonDependency('@mdn/browser-compat-data', 'data.json');
const specs = readJsonDependency('browser-specs', 'index.json');

function specifications(explicitQuery) {
  const { browserCompat: implicitQuery } = this.env;
  let { specUrls: explicitSpecUrls = '' } = this.env;
  const query = explicitQuery || implicitQuery;

  if (!query && !explicitSpecUrls) {
    throw new Error('No query provided');
  }

  let specURLs = [];

  if (query) {
    if (typeof query !== 'string') {
      return query
        .map((spec) =>
          specifications.call({
            ...this,
            env: { ...this.env, browserCompat: spec },
          }),
        )
        .join('\n');
    }
    let data = bcd;

    for (const current of query.split('.')) {
      data = data?.[current] || undefined;
    }

    if (data !== undefined) {
      for (const [key, compat] of Object.entries(data)) {
        if (key === '__compat' && compat.spec_url) {
          if (Array.isArray(compat.spec_url)) {
            specURLs = compat.spec_url;
          } else {
            specURLs.push(compat.spec_url);
          }
        }
      }
    }
  }

  if (explicitSpecUrls !== '') {
    if (typeof explicitSpecUrls !== 'string') {
      explicitSpecUrls = explicitSpecUrls.join(',');
    }
    specURLs.push(...explicitSpecUrls.split(',').map((url) => url.trim()));
  }

  if (specURLs.length > 0) {
    // Use BCD specURLs to look up more specification data
    // from the browser-specs package
    const specificationsData = specURLs
      .map((specURL) => {
        const spec = specs.find(
          (specItem) =>
            specURL.startsWith(specItem.url) ||
            specURL.startsWith(specItem.nightly.url) ||
            specURL.startsWith(specItem.series.nightlyUrl),
        );
        const specItemData = {
          bcdSpecificationURL: specURL,
          title: 'Unknown specification',
          shortTitle: 'Unknown specification',
        };
        if (spec) {
          specItemData.title = spec.title;
          specItemData.shortTitle = spec.shortTitle;
        }

        return specItemData;
      })
      .filter(Boolean);

    if (specificationsData.length > 0) {
      return `
        <table class="table--standard">
          <thead>
            <tr>
              <th scope="col">Специфікація</th>
            </tr>
          </thead>
          <tbody>
          ${specificationsData
            .map(
              (spec) => `<tr>
              <td>
                <a href="${spec.bcdSpecificationURL}">
                  ${spec.title} ${
                spec.title !== spec.shortTitle ? `(${spec.shortTitle})` : ''
              }<br />${
                spec.bcdSpecificationURL.includes('#')
                  ? `<small>
                      # ${`${spec.bcdSpecificationURL.split('#')[1]}`}
                    </small>`
                  : ''
              }
                </a>
              </td>
            </tr>`,
            )
            .join('')}
          </tbody>
        </table>`.trim();
    }
    return `
        <div class="notecard__warning">
          <h4>Специфікації не знайдено</h4>
          <p>
            Не знайдено ніякої інформації про специфікацію для <code>${query}</code>.<br />
            <a href="#on-github">Перевірте на наявність проблем зі сторінкою тут</a>, або ж внесіть
            відсутнє посилання на специфікацію до <a href="https://github.com/mdn/browser-compat-data">
              mdn/browser-compat-data
            </a>.
            Також варто пересвідчитись, що специфікація включена до <a href="https://github.com/w3c/browser-specs">w3c/browser-specs</a>.
          </p>
        </div>`.trim();
  }

  return `
    <div class="bcd__container">
      Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
    </div>`.trim();
}

export default specifications;
