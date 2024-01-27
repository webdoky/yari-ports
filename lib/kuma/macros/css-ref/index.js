import labels from './labels';
import guidesSections from './section-guides';
// import learningSections from './section-learning';
import referenceSections from './section-ref';

function cssReferenceMacro() {
  // TODO: we definitely need it typed at some point
  return [
    // Learn section is currently out of scope of the project
    // {
    //   title: labels.Learn_CSS,
    //   sections: this.callMacro(learningSections),
    // },
    {
      title: labels.Reference,
      sections: this.callMacro(referenceSections),
    },
    {
      title: labels.Guides,
      sections: this.callMacro(guidesSections),
    },
  ];
}

export default cssReferenceMacro;
