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
        <table className="standard-table">
          <thead>
            <tr>
              <th scope="col">Specification</th>
            </tr>
          </thead>
          <tbody>
          ${specificationsData
            .map(
              (spec) => `
            <tr>
              <td>
                <a href="${spec.bcdSpecificationURL}">
                  ${spec.title}
                  ${
                    spec.title !== spec.shortTitle ? `(${spec.shortTitle})` : ''
                  }
                  <br />
                  ${
                    spec.bcdSpecificationURL.includes('#') &&
                    `
                    <small>
                      # ${`${spec.bcdSpecificationURL.split('#')[1]}`}
                    </small>
                  `
                  }
                </a>
              </td>
            </tr>
          `
            )
            .join('')}
          </tbody>
        </table>`;
    } else {
      return `
        <div className="notecard__warning">
          <h4>No specification found</h4>
          <p>
            No specification data found for <code>{query}</code>.<br />
            <a href="#on-github">Check for problems with this page</a> or
            contribute a missing <code>spec_url</code> to{" "}
            <a href="https://github.com/mdn/browser-compat-data">
              mdn/browser-compat-data
            </a>
            . Also make sure the specification is included in{" "}
            <a href="https://github.com/w3c/browser-specs">w3c/browser-specs</a>
            .
          </p>
        </div>`;
    }
  }

  return `
    <div class="bcd__container">
      If you're able to see this, something went wrong on this page.
    </div>`;
}

module.exports.default = specifications;
