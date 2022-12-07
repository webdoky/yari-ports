import GeneralLinks from './general-links';
import Inputs from './inputs';
import HtmlReferenceSection from './section';

export default function HtmlReference() {
  return [
    {
      links: this.callMacro(GeneralLinks),
      sections: this.callMacro(Inputs),
    },
    {
      sections: [
        this.callMacro(HtmlReferenceSection,'Web/HTML/Element', 'Елементи'),
      ],
    },
  ];
}
