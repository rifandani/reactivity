class ThemeText extends HTMLElement {
  static get observedAttributes() {
    return ['data-theme'];
  }

  constructor() {
    super();
    // If you attach a shadow root to a custom element with mode: "closed" set, you won't be able to access the shadow DOM from the outside
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const p = document.createElement('p');
    p.textContent = 'Selected Theme: ';

    const span = document.createElement('span');
    span.textContent = this.getAttribute('data-theme');

    const style = document.createElement('style');
    style.textContent = `
    .bg-white {
      background-color: azure;
    }
    .bg-black {
      background-color: slategrey;
    }
    .text-white {
      color: beige;
    }
    .text-black {
      color: brown;
    }
    `;

    p.appendChild(span);
    shadowRoot.appendChild(p);
    shadowRoot.appendChild(style);
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    console.log(`connectedCallback invoked`);
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    console.log(`disconnectedCallback invoked`);
  }

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback() {
    console.log(`adoptedCallback invoked`);
  }

  /**
   * Invoked each time one of the custom element's attributes is added, removed, or changed
   * Which attributes to notice change for is specified in a `static get observedAttributes` method
   *
   * @param {string} name
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'data-theme') {
      const p = this.shadowRoot?.querySelector('p');
      const span = this.shadowRoot?.querySelector('span');

      if (p) {
        p.className =
          newValue === 'light' ? 'bg-white text-black' : 'bg-black text-white';
      }
      if (span) {
        span.textContent = newValue || '';
      }
    }
  }
}
