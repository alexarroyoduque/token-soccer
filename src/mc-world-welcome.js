import { LitElement, html, css } from 'lit-element';
import {t} from './helpers/helpers.js'
import './mc-title-jumbo.js';
import './mc-button.js';

export class McWorldWelcome extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--theme-color-blue);
        padding: 1rem;
        height: calc(100vh - 2rem);
        background-image: url(https://img.freepik.com/premium-photo/soft-neon-blue-gradient-abstract-background-design_973208-58.jpg);
        background-size: cover;
      }

      section {
        text-align: center;
      }

      ul {
        padding: 0
      }

      li {
        list-style: none;
        margin-bottom: 1rem;
      }

      li:last-child {
        margin-top: 2rem;
      }

    `;
  }


  render() {
    return html`
      <section>
      <mc-title-jumbo
          title="WORLD TOUR"
          colorTitle="var(--theme-color-yellow)"
          description=${t('main-world-tour-new-subtitle')}
          colorDescription="var(--theme-color-yellow)"
        ></mc-title-jumbo>
        <ul>
          <li>
            <mc-button
              text=${t('main-world-tour-new-continue')}
              navigation='worldTourMain'
              color="var(--theme-color-blue)"
              ></mc-button>
          </li>
          <li>
            <mc-button
              text=${t('main-world-tour-new-game')}
              navigation='worldTourNew'
              color="var(--theme-color-blue)"
              ></mc-button>
          </li>
          <li>
            <mc-button
              text=${t('main-world-tour-new-back')}
              navigation='menu'
              color="var(--theme-color-gray-light)"
              ></mc-button>
          </li>
        </ul>
      </section>
    `;
  }


}

customElements.define('mc-world-welcome', McWorldWelcome);
