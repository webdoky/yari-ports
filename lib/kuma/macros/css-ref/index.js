import labels from './labels.js';
import learningSections from './section-learning.js';
import refSections from './section-ref.js';
import guidesSections from './section-guides.js';

function cssRefMacro() {
  const context = this;

  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels['Learn_CSS'],
      sections: learningSections(context),
    },
    {
      title: labels['Reference'],
      sections: refSections(context),
    },
    {
      title: labels['Guides'],
      sections: guidesSections(context),
    },
  ];
}

export default cssRefMacro;
