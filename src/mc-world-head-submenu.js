import { LitElement, html, css } from 'lit-element';
import './mc-button.js';

export class McWorldHeadSubmenu extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      colorTitle: { type: String },
      media: {type: String},
      navigation: {type: String},
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

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .header-content {
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      mc-button {
        --mc-button-width: 2rem;
        margin-right: 1rem;
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
          <mc-button mode="mini" text="<-" navigation=${this.navigation}></mc-button>
          <h1 style="color: ${this.colorTitle}; text-shadow: 0 0 ${this.hasShadow ? '20px' : '0'} ${this.colorTitle};">
            ${this.title}
          </h1>
        </div>
        <div class="media">
          ${this.calculateStars(this.media)} ${this.media}
        </div>
      </div>
    `;
  }


}

customElements.define('mc-world-head-submenu', McWorldHeadSubmenu);
