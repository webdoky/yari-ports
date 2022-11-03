import labels from './labels';
import guidesSections from './section-guides';
import learningSections from './section-learning';
import referenceSections from './section-ref';

function cssReferenceMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels.Learn_CSS,
      sections: learningSections(this),
    },
    {
      title: labels.Reference,
      sections: referenceSections(this),
    },
    {
      title: labels.Guides,
      sections: guidesSections(this),
    },
  ];
}

export default cssReferenceMacro;
