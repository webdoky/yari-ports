import SvgGuides from './guides';
import labels from './labels';
import SvgReferences from './references';
import SvgTutorials from './tutorials';

export default function SVGRef() {
  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels.Tutorials,
      sections: this.callMacro(SvgTutorials),
    },
    {
      title: labels.References,
      sections: this.callMacro(SvgReferences),
    },
    {
      title: labels.Guides,
      links: this.callMacro(SvgGuides),
    },
  ];
}
