import { LitElement, html, css } from 'lit-element';

export class McWorldHead extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      colorTitle: { type: String },
      colorDescription: { type: String },
      media: {type: String},
      cash: {type: String},
      competition: {type: String},
      hasShadow: {type: Boolean}
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        text-align: left;
      }

      h1 {
        font-family: var(--theme-primary-font-family);
        margin: 0;
        font-size: 1.4rem;
      }

      p {
        font-family: var(--theme-primary-font-family);
        padding: .1rem;
        font-size: 1rem;
        margin: 0;
      }

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .header-content {
        text-align: left;
      }

      .media {
        margin-left: auto;
        padding: 0.1rem;
        font-family: var(--theme-primary-font-family);
        font-size: 1.2rem;
      }

    `;
  }

  calculateStars(value) {
    let stars = '';
    if (value >= 80) {
      stars = '★★★★★';
    } else if (value >= 75) {
      stars = '★★★★☆';
    } else if (value >= 55) {
      stars = '★★★☆☆';
    } else if (value >= 30) {
      stars = '★★☆☆☆';
    } else if (value >= 20) {
      stars = '★☆☆☆';
    }
    return stars;
  }


  render() {
    return html`
      <div class="header-container">
        <div class="header-content">
          <h1 style="color: ${this.colorTitle}; text-shadow: 0 0 ${this.hasShadow ? '20px' : '0'} ${this.colorTitle};">
            ${this.title}
          </h1>
          <p style="color: ${this.colorDescription};">${this.cash}€ | ${this.competition}</p>
        </div>
        <div class="media">
          ${this.calculateStars(this.media)} ${this.media}
        </div>
      </div>
    `;
  }


}

customElements.define('mc-world-head', McWorldHead);
