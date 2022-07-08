// Note! This is in many ways copied verbatim from @mdn/yari
import bcd from '@mdn/browser-compat-data/data.json' assert { type: 'json' };

export function browserName(id) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }

  return browserInfo[id].name;
}

export function browserPreviewName(id) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }
  return browserInfo[id].preview_name;
}
