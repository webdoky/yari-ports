import refSections from './section-ref.js';
import quickLinksSections from './section-quick-links.js';
import refTitleLinks from './section-ref-title-links.js';
import generalLinks from './section-general.js';

function jsSidebarMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      links: this.callMacro(generalLinks),
      sections: this.callMacro(quickLinksSections),
    },
    {
      links: this.callMacro(refTitleLinks),
      sections: this.callMacro(refSections),
    },
  ];
}

export default jsSidebarMacro;
