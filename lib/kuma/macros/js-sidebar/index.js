import refSections from './section-ref.js';
import quickLinksSections from './section-quick-links.js';
import refTitleLinks from './section-ref-title-links.js';
import generalLinks from './section-general.js';

function jsSidebarMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      links: generalLinks.call(this),
      sections: quickLinksSections.call(this),
    },
    {
      links: refTitleLinks.call(this),
      sections: refSections.call(this),
    },
  ];
}

export default jsSidebarMacro;
