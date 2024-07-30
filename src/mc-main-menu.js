import { LitElement, html, css } from 'lit-element';
import {t} from './helpers/helpers.js'
import './mc-title-jumbo.js';
import './mc-button-jumbo.js';

export class McMainMenu extends LitElement {
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
        background-image: var(--theme-background-main);
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

    `;
  }

  render() {
    return html`

      <section>
        <mc-title-jumbo
          title="TOKEN SOCCER"
          colorTitle="var(--theme-color-green)"
          description=${t('main-subtitle')}
          colorDescription="var(--theme-color-green)"
        ></mc-title-jumbo>
        <ul>
          <li>
            <mc-button-jumbo
              title="World tour"
              description=${t('main-world-tour-description')}
              image='https://cdn.pixabay.com/photo/2016/04/27/15/02/africa-1356782_1280.jpg'
              navigation='worldWelcome'
              ></mc-button-jumbo>
          </li>
          <li>
            <mc-button-jumbo
              title=${t('main-world-tour-about')}
              description=${t('main-world-tour-about-description')}
              image='https://cdn.pixabay.com/photo/2017/07/10/23/43/question-mark-2492009_1280.jpg'
              navigation='about'
              ></mc-button-jumbo>
          </li>
        </ul>
      </section>
    `;
  }


}

customElements.define('mc-main-menu', McMainMenu);
