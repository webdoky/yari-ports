import generalLinks from './section-general';
import quickLinksSections from './section-quick-links';
import referenceSections from './section-ref';
import referenceTitleLinks from './section-ref-title-links';

function jsSidebarMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      links: this.callMacro(generalLinks),
      sections: this.callMacro(quickLinksSections),
    },
    {
      links: this.callMacro(referenceTitleLinks),
      sections: this.callMacro(referenceSections),
    },
  ];
}

export default jsSidebarMacro;
