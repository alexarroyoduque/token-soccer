import { LitElement, html, css } from 'lit-element';
import {getSquadMedia} from './helpers/helpers.js'

import './mc-world-head-submenu.js';
import './mc-button-core.js';
import './mc-button.js';
import './mc-template.js';

export class McWorldEvents extends LitElement {
  static get properties() {
    return {
      worldTeam: { type: Object }
    };
  }

  constructor() {
    super();
    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam')) || {};
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

      .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1rem; /* Espacio entre los botones */
      }

    `;
  }


  render() {
    return html`
      <mc-template>
        <div slot="header">
          <mc-world-head-submenu
            title="Eventos"
            colorTitle="var(--theme-color-yellow)"
            media=${getSquadMedia(this.worldTeam.caps, this.worldTeam.starterIds)}
            navigation="worldTourMain"
          ></mc-world-head-submenu>
        </div>

        <div slot="main" class="button-container">

          <mc-button-core
            title="Ligas"
            description="Elige competición y llega a lo más alto"
            image="https://lh5.googleusercontent.com/-H4Nw9Aaj4Q4/Sq5_h_0Hj2I/AAAAAAAAAj8/-OZ1Ke1R-Gk/videoschapas%252520003.jpg"
            navigation="worldTourLeagues"
          ></mc-button-core>

          <mc-button-core
            title="Desafíos"
            description="Torneos y competiciones con reglas especiales"
            image="https://www.jb-hinchables.es/sites/default/files/styles/product_images_small/public/2023-07/voetbaldoeltje-blauw2.jpg?itok=8lO2Tt0G"
            navigation="worldTourChallenges"
          ></mc-button-core>

          <mc-button-core
            title="Duelo"
            description="Consigue la chapa estrella de tus rivales"
            image="https://img.freepik.com/premium-vector/stock-vector-versus-game-cover-banner-sport-vs-team-team-versus-background-with-sparks-effect_515532-426.jpg"
            navigation="worldTourEventsDuel"
          ></mc-button-core>

        </div>
        <div slot="footer-left" class="section">
          -
        </div>
        <div slot="footer-center" class="section">
          -
        </div>
        <div slot="footer-right" class="section">
          -
        </div>
      </mc-template>
    `;
  }
}

customElements.define('mc-world-events', McWorldEvents);
