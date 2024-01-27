import labels from './labels';
import HtmlGuides from './section-guides';
import HtmlReferences from './section-reference';

function HtmlSidebar() {
  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels.References,
      sections: this.callMacro(HtmlReferences),
    },
    {
      title: labels.Guides,
      links: this.callMacro(HtmlGuides),
    },
  ];
}

export default HtmlSidebar;
