import h from 'hyperscript';
import Rule from './Rule';

class Footnote extends Rule {
  constructor(options) {
    options.name = 'Footnote';
    super(options);
  }
  afterAdd(element, state, requestNewPage, overflowCallback) {
    const number = state.currentPage.footer.querySelectorAll('.footnote').length + 1;

    const parent = element.parentNode;
    if (!parent) {
      throw Error('Bindery: Rule assumes element has been added but it has no parent.');
    }
    const defensiveClone = element.cloneNode(true);
    const replacement = this.replace(defensiveClone, number);
    parent.replaceChild(replacement, element);

    const footnote = h('.footnote');
    const contents = this.render(element, number);
    if (contents instanceof HTMLElement) footnote.appendChild(contents);
    else if (typeof contents === 'string') footnote.innerHTML = contents;
    else footnote.textContent = `<sup>${number}</sup> Error: You must return an HTML Element or string from render`;

    state.currentPage.footer.appendChild(footnote);

    if (state.currentPage.hasOverflowed()) {
      state.currentPage.footer.removeChild(footnote);
      parent.replaceChild(element, replacement);

      return overflowCallback(element);
    }

    return replacement;
  }
  replace(element, number) {
    element.insertAdjacentHTML('beforeEnd', `<sup class="bindery-sup">${number}</sup>`);
    return element;
  }
  render(element, number) {
    return `<sup>${number}</sup> Default footnote (<a href='http://evanbrooks.info/bindery/#docs'>Docs</a>)`;
  }
}

export default function (userOptions) {
  return new Footnote(userOptions);
}
