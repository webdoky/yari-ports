import htmlElement from './html-element';
import ListSubpagesForSidebar from './list-subpages-for-sidebar';

const strings = {
  Input_types: '<code>Типи &lt;input&gt;</code>',
};
function containsTag(tagList, tagParameter) {
  if (tagList === null || tagList === undefined) return false;
  if (tagParameter === undefined || tagParameter === null) return 0;
  const tag = tagParameter.toLowerCase();
  return tagList.some((tagListItem) => tagListItem.toLowerCase() === tag);
}

function WrapHtmlElement(name) {
  return this.callMacro(htmlElement, name, '', '', '', 'HTMLRef');
}

export default function HtmlReference() {
  const {
    env: { slug, tags, targetLocale },
    registry,
  } = this;
  const s_html_reference_href = `/${targetLocale}/docs/Web/HTML/Element`;
  const s_html_reference_title = 'Елементи HTML';
  let resultHTML;
  // Find the section of HTML this page belongs to (that is the first tag of the form "HTML XYZ")
  const found_tag =
    tags.find(
      (tag) => tag !== 'HTML Elements' && `${tag}`.slice(0, 5) === 'HTML ',
    ) || '';
  // Find the HTML Tags belonging to the same subject
  if (found_tag) {
    // Find the pages, sub-pages of HTML/Element that are tagged with that specific tag
    const pageList = registry.getChildren(s_html_reference_href); // Get subpages, including tags
    resultHTML = pageList
      .filter((element) => containsTag(element.tags, found_tag))
      .map((element) => element.slug.split('/').pop(-1).toLowerCase());
  }
  return `<section id="Quick_links">
      <ol>
        ${
          found_tag
            ? resultHTML
                .map((slugLeafElementName) =>
                  slugLeafElementName === 'heading_elements'
                    ? `<li>${this.callMacro(
                        htmlElement,
                        'Heading_elements',
                        '<code>&lt;h1&gt;-&lt;h6&gt;</code>',
                      )}</li>`
                    : `<li>${this.callMacro(
                        htmlElement,
                        slugLeafElementName,
                      )}</li>`,
                )
                .join('')
            : ''
        }
        ${
          slug.includes('/HTML/Element/input')
            ? `<li><details open><summary>${
                strings.Input_types
              }</summary>${this.callMacro(
                ListSubpagesForSidebar,
                '/en-US/docs/Web/HTML/Element/input',
              )}</details></li>`
            : ''
        }
        <li><details><summary>${s_html_reference_title}</summary><ol>
        <li class="no-bullet"><span class="no-link">A</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'a')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'abbr')}</li>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'acronym',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'address')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'applet',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'area')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'article')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'aside')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'audio')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">B</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'b')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'base')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'basefont',
          )}</s></li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'bdi')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'bdo')}</li>
          <li><s class="nonStdElement">${this.callMacro(
            WrapHtmlElement,
            'bgsound',
          )}</s></li>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'big',
          )}</s></li>
          <li><s class="nonStdElement">${this.callMacro(
            WrapHtmlElement,
            'blink',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'blockquote')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'body')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'br')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'button')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">C</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'canvas')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'caption')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'center',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'cite')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'code')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'col')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'colgroup')}</li>
          <li class="webcomp">${this.callMacro(WrapHtmlElement, 'content')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">D</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'data')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'datalist')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'dd')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'del')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'details')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'dfn')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'dialog')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'dir',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'div')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'dl')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'dt')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">E</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'em')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'embed')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">F</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'fieldset')}</li>
          <li class="html5">${this.callMacro(
            WrapHtmlElement,
            'figcaption',
          )}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'figure')}</li>
          <li><s class="deprecatedElement obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'font',
          )}</s></li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'footer')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'form')}</li>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'frame',
          )}</s></li>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'frameset',
          )}</s></li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">G H</span>
        <ol>
          <li>${this.callMacro(
            htmlElement,
            'Heading_elements',
            '<code>&lt;h1&gt;-&lt;h6&gt;</code>',
          )}</li>
          <li>${this.callMacro(WrapHtmlElement, 'head')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'header')}</li>
          <li class="html5"><s class="deprecatedElement obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'hgroup',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'hr')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'html')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">I</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'i')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'iframe')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'img')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'input')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'ins')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">J K</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'kbd')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'keygen')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">L</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'label')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'legend')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'li')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'link')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">M</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'main')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'map')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'mark')}</li>
          <li><s class="nonStdElement">${this.callMacro(
            WrapHtmlElement,
            'marquee',
          )}</s></li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'menu')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'menuitem')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'meta')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'meter')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">N</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'nav')}</li>
          <li><s class="nonStdElement">${this.callMacro(
            WrapHtmlElement,
            'nobr',
          )}</s></li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'noframes',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'noscript')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">O</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'object')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'ol')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'optgroup')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'option')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'output')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">P</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'p')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'param')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'picture')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'plaintext',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'pre')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'progress')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">Q</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'q')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">R</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'rp')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'rt')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'rtc')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'ruby')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">S</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 's')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'samp')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'script')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'section')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'select')}</li>
          <li class="webcomp">${this.callMacro(WrapHtmlElement, 'shadow')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'slot')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'small')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'source')}</li>
          <li><s class="nonStdElement">${this.callMacro(
            WrapHtmlElement,
            'spacer',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'span')}</li>
          <li><s class="obsoleteElement deprecatedElement">${this.callMacro(
            WrapHtmlElement,
            'strike',
          )}</s></li>
          <li>${this.callMacro(WrapHtmlElement, 'strong')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'style')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'sub')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'summary')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'sup')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">T</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'table')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'tbody')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'td')}</li>
          <li class="webcomp">${this.callMacro(
            WrapHtmlElement,
            'template',
          )}</li>
          <li>${this.callMacro(WrapHtmlElement, 'textarea')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'tfoot')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'th')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'thead')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'time')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'title')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'tr')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'track')}</li>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'tt',
          )}</s></li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">U</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'u')}</li>
          <li>${this.callMacro(WrapHtmlElement, 'ul')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">V</span>
        <ol>
          <li>${this.callMacro(WrapHtmlElement, 'var')}</li>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'video')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">W</span>
        <ol>
          <li class="html5">${this.callMacro(WrapHtmlElement, 'wbr')}</li>
        </ol>
        </li><li class="no-bullet"><span class="no-link">X Y Z</span>
        <ol>
          <li><s class="obsoleteElement">${this.callMacro(
            WrapHtmlElement,
            'xmp',
          )}</s></li>
        </ol>
      </li>
    </ol>
    </details></li>
    </ol>
    </section>`;
}
