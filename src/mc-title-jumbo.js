import { LitElement, html, css } from 'lit-element';

export class McTitleJumbo extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      colorTitle: { type: String },
      colorDescription: { type: String }
    };
  }

  constructor() {
    super();

  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      h1 {
        font-family: var(--theme-primary-font-family);
        margin: 0;
        font-size: 3rem;
      }

      p {
        font-family: var(--theme-primary-font-family);
        padding: .1rem;
        font-size: 1.3rem;
        margin: 0;
      }

    `;
  }

  render() {
    return html`
        <h1 style='color: ${this.colorTitle};text-shadow: 0 0 20px ${this.colorTitle};'>${this.title}</h1>
        <p style='color: ${this.colorDescription};'>${this.description}</p>
    `;
  }


}

customElements.define('mc-title-jumbo', McTitleJumbo);
