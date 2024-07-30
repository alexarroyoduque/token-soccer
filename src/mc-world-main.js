import { LitElement, html, css } from 'lit-element';
import {getSquadMedia, t} from './helpers/helpers.js'

import './mc-world-head.js';
import './mc-button-core.js';
import './mc-button.js';
import './mc-template.js';


export class McWorldMain extends LitElement {
  static get properties() {
    return {
      worldTeam: { type: Object }
    };
  }

  constructor() {
    super();
    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam'));
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
        background-color: var(--theme-color-blue);
        background-image: var(--theme-background-world);
        background-size: cover;
      }

      .buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
      }
    `;
  }

  render() {
    return html`
      <mc-template>
        <div slot="header">
          <mc-world-head
            title="${this.worldTeam.name}"
            colorTitle="var(--theme-color-yellow)"
            media=${getSquadMedia(this.worldTeam.caps, this.worldTeam.starterIds)}
            cash="${this.worldTeam.cash}"
            competition="--"
            colorDescription="var(--theme-color-yellow)"
          ></mc-world-head>
        </div>
        <div slot="main" class="buttons">
          <mc-button-core
            title=${t('main-world-tour-team')}
            description=${t('main-world-tour-team-description')}
            image="https://cdn.pixabay.com/photo/2015/02/24/20/52/bottle-caps-647830_1280.jpg"
            navigation="about"
          ></mc-button-core>
          <mc-button-core
            title=${t('main-world-tour-squad')}
            description=${t('main-world-tour-squad-description')}
            image="https://www.pizarras-digitales.com/wp-content/uploads/2024/04/pizarra_futbol.jpg"
            navigation="worldTourSquad"
          ></mc-button-core>
          <mc-button-core
            title=${t('main-world-tour-events')}
            description=${t('main-world-tour-events-description')}
            image="https://cdn.pixabay.com/photo/2023/06/08/13/31/balls-8049598_1280.jpg"
            navigation="worldTourEvents"
          ></mc-button-core>
          <mc-button-core
            title=${t('main-world-tour-services')}
            description=${t('main-world-tour-services-description')}
            image="https://cdn.pixabay.com/photo/2017/07/11/18/07/market-2494520_1280.jpg"
            navigation="about"
          ></mc-button-core>
          <mc-button-core
            title=${t('main-world-tour-collection')}
            description=${t('main-world-tour-collection-description')}
            image="https://cdn.pixabay.com/photo/2016/11/18/13/14/boxes-1834406_1280.jpg"
            navigation="about"
          ></mc-button-core>
          <mc-button-core
            title=${t('main-world-tour-info')}
            description=${t('main-world-tour-info-description')}
            image="https://cdn.pixabay.com/photo/2017/07/10/23/43/question-mark-2492009_1280.jpg"
            navigation="about"
          ></mc-button-core>
        </div>
        <div slot="footer-left" class="section">-</div>
        <div slot="footer-center" class="section">-</div>
        <div slot="footer-right" class="section">
          <mc-button mode="mini" text=${t('main-world-tour-exit')} navigation="worldWelcome"></mc-button>
        </div>
      </mc-template>
    `;
  }
}

customElements.define('mc-world-main', McWorldMain);
