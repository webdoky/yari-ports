import labels from './labels.js';
import learningSections from './section-learning.js';
import refSections from './section-ref.js';
import guidesSections from './section-guides.js';

function cssRefMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels['Learn_CSS'],
      sections: learningSections.call(this),
    },
    {
      title: labels['Reference'],
      sections: refSections.call(this),
    },
    {
      title: labels['Guides'],
      sections: guidesSections.call(this),
    },
  ];
}

export default cssRefMacro;
