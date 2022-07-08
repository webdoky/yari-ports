import refSections from './section-ref.js';
import quickLinksSections from './section-quick-links.js';
import refTitleLinks from './section-ref-title-links.js';
import generalLinks from './section-general.js';

function jsSidebarMacro() {
  const context = this;

  // TODO: we definitely need it typed at some point
  return [
    {
      links: generalLinks(context),
      sections: quickLinksSections(context),
    },
    {
      links: refTitleLinks(context),
      sections: refSections(context),
    },
  ];
}

export default jsSidebarMacro;
