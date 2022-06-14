const bcd = require('@mdn/browser-compat-data');
const specs = require('browser-specs');

function specifications(explicitQuery) {
  const { browserCompat: implicitQuery } = this;
  const query = explicitQuery || implicitQuery;

  if (!query) {
    throw new Error('No query provided');
  }

  const data = query
    .split('.')
    .reduce((prev, curr) => (prev && prev[curr] ? prev[curr] : undefined), bcd);

  if (data !== undefined) {
    let specURLs = [];

    for (const [key, compat] of Object.entries(data)) {
      if (key === '__compat' && compat.spec_url) {
        if (Array.isArray(compat.spec_url)) {
          specURLs = compat.spec_url;
        } else {
          specURLs.push(compat.spec_url);
        }
      }
    }

    // Use BCD specURLs to look up more specification data
    // from the browser-specs package
    const specificationsData = specURLs
      .map((specURL) => {
        const spec = specs.find(
          (spec) =>
            specURL.startsWith(spec.url) ||
            specURL.startsWith(spec.nightly.url) ||
            specURL.startsWith(spec.series.nightlyUrl)
        );
        const specificationsData = {
          bcdSpecificationURL: specURL,
          title: 'Unknown specification',
          shortTitle: 'Unknown specification',
        };
        if (spec) {
          specificationsData.title = spec.title;
          specificationsData.shortTitle = spec.shortTitle;
        }

        return specificationsData;
      })
      .filter(Boolean);

    if (specificationsData.length) {
      return `
        <table className="table--standard">
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
                  ${spec.title}
                  ${
                    spec.title !== spec.shortTitle ? `(${spec.shortTitle})` : ''
                  }
                  <br />
                  ${
                    spec.bcdSpecificationURL.includes('#') &&
                    `<small>
                      # ${`${spec.bcdSpecificationURL.split('#')[1]}`}
                    </small>`
                  }
                </a>
              </td>
            </tr>`
            )
            .join('')}
          </tbody>
        </table>`.trim();
    } else {
      return `
        <div className="notecard__warning">
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
  }

  return `
    <div class="bcd__container">
      Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
    </div>`.trim();
}

module.exports.default = specifications;
