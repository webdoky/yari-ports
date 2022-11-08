import labels from './labels.js';
import learningSections from './section-learning.js';
import refSections from './section-ref.js';
import guidesSections from './section-guides.js';

function cssRefMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels['Learn_CSS'],
      sections: this.callMacro(learningSections),
    },
    {
      title: labels['Reference'],
      sections: this.callMacro(refSections),
    },
    {
      title: labels['Guides'],
      sections: this.callMacro(guidesSections),
    },
  ];
}

export default cssRefMacro;
