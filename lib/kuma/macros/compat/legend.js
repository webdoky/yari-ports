// Note! This is in many ways copied verbatim from @mdn/yari
import { asList } from './feature-row';
import { listFeatures } from '.';

// Also specifies the order in which the legend appears
const LEGEND_LABELS = {
  yes: 'Повна підтримка',
  partial: 'Часткова підтримка',
  no: 'Немає підтримки',
  unknown: 'Сумісність невідома',
  experimental: 'Експериментальне. Варто очікувати змін цієї функціональності в майбутньому.',
  'non-standard': 'Нестандартне. Перевірте міжбраузерну підтримку перед використанням.',
  deprecated: 'Нерекомендоване. Не для застосування в нових вебсайтах.',
  footnote: 'Дивіться примітки щодо реалізації.',
  disabled: 'Користувач повинен явно ввімкнути цю можливість.',
  altname: 'Використовує нестандартну назву.',
  prefix: 'Вимагає для використання префіксу постачальника або іншої назви.',
};

function getActiveLegendItems(compat, name) {
  const legendItems = new Set();

  for (const feature of listFeatures(compat, '', name)) {
    const { status, support } = feature.compat;

    if (status) {
      if (status.experimental) {
        legendItems.add('experimental');
      }
      if (status.deprecated) {
        legendItems.add('deprecated');
      }
      if (!status.standard_track) {
        legendItems.add('non-standard');
      }
    }

    for (const browserSupport of Object.values(support)) {
      if (!browserSupport) {
        legendItems.add('no');
        continue;
      }

      for (const versionSupport of asList(browserSupport)) {
        if (versionSupport.version_added) {
          if (versionSupport.flags && versionSupport.flags.length > 0) {
            legendItems.add('no');
          } else {
            legendItems.add('yes');
          }
        } else if (versionSupport.version_added == null) {
          legendItems.add('unknown');
        } else {
          legendItems.add('no');
        }

        if (versionSupport.partial_implementation) {
          legendItems.add('partial');
        }
        if (versionSupport.prefix) {
          legendItems.add('prefix');
        }
        if (versionSupport.notes) {
          legendItems.add('footnote');
        }
        if (versionSupport.alternative_name) {
          legendItems.add('altname');
        }
        if (versionSupport.flags) {
          legendItems.add('disabled');
        }
      }
    }
  }
  return Object.keys(LEGEND_LABELS)
    .filter((key) => legendItems.has(key))
    .map((key) => [key, LEGEND_LABELS[key]]);
}

export default function Legend({ compat, name }) {
  return `<section class="bc-legend">
      <h3 class="visually-hidden" id="Legend">
        Legend
      </h3>
      <dl class="bc-legend-items-container">${getActiveLegendItems(
        compat,
        name,
      ).map(([key, label]) =>
        ['yes', 'partial', 'no', 'unknown'].includes(key)
          ? `<div class="bc-legend-item">
          <dt>
            <span class="bc-supports-${key} bc-supports">
              <abbr
                class="bc-level bc-level-${key} only-icon"
                title="${label}"
              >
                <span>${label}</span>
              </abbr>
            </span>
          </dt>
          <dd>${label}</dd>
        </div>`
          : `<div class="bc-legend-item">
          <dt>
            <abbr
              class="only-icon legend-icons ic-${key}"
              title="${label}"
            ></abbr>
          </dt>
          <dd>${label}</dd>
        </div>`,
      )}</dl>
    </section>`;
}
