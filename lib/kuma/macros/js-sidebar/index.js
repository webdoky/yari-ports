import generalLinks from './section-general';
import quickLinksSections from './section-quick-links';
import referenceSections from './section-ref';
import referenceTitleLinks from './section-ref-title-links';

function jsSidebarMacro() {
  // TODO: we definitely need it typed at some point
  return [
    {
      links: generalLinks(this),
      sections: quickLinksSections(this),
    },
    {
      links: referenceTitleLinks(this),
      sections: referenceSections(this),
    },
  ];
}

export default jsSidebarMacro;
