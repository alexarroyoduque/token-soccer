import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getSquadMedia, simulateMatch, t } from './helpers/helpers.js';
import './mc-match-result.js';

import './mc-world-head-submenu.js';
import './mc-button-core.js';
import './mc-button.js';
import './mc-template.js';
import './mc-card-duel.js';

export class McWorldEventsDuelMatch extends LitElement {
  static get properties() {
    return {
      worldTeam: { type: Object },
      selectedDuel: { type: Object },
      team1Goals: { type: String },
      team2Goals: { type: String },
      result: { type: Object } // Asegurarse de que result esté definido como una propiedad
    };
  }

  constructor() {
    super();
    this.selectedDuel = {};
    this.team1Goals = 'c';
    this.team2Goals = 'c';
    this.result = null; // Inicializar result como null

    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam')) || {};
  }

  firstUpdated() {
    this.result = simulateMatch(this.worldTeam, this.selectedDuel);

    console.log('result', this.result)

    this.message = this.getResultMessage(this.result);

    if (this.result.team1.goals > this.result.team2.goals) {
      this.selectedDuel.completed = true;
      this.worldDuels = JSON.parse(localStorage.getItem('worldDuels')) || {};
      this.worldDuels.find(duel => duel.capRewardId === this.selectedDuel.capRewardId).completed = true;

      let allCaps = JSON.parse(localStorage.allCaps);

      let capReward = allCaps.find(cap => cap.id === this.selectedDuel.capRewardId);

      capReward.mediaReal = capReward.media;
      capReward.positionActive = 'reserve';
      capReward.positionPath = {
        global: 'reserve',
        group: 'reserve'
      };
      this.worldTeam.caps.push(capReward);
      this.worldTeam.reserveIds.push(this.selectedDuel.capRewardId);
      localStorage.setItem('worldDuels', JSON.stringify(this.worldDuels));
      localStorage.setItem('worldTeam', JSON.stringify(this.worldTeam));
    } else {
      localStorage.setItem('worldTeam', JSON.stringify(this.worldTeam));
    }

    // Asegurarse de que se actualice el componente después de cambiar result
    this.requestUpdate();
  }

  getResultMessage(result){
    let message = '';
    if (result.team1.goals > result.team2.goals) {
      message = `${t('main-world-tour-events-duels-win')} ${this.selectedDuel.name}`;
    } else {
      message = t('main-world-tour-events-duels-lose');
    }

    return message;
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

      p {
        text-align: center;
        font-family: var(--theme-secondary-font-family);
        font-size: 1.5rem;
        background-color: rgb(0 0 0 / 70%);
        color: white;
        padding: .4rem;
      }
    `;
  }

  render() {
    return html`
      <mc-template @playMatch=${this.handlePlayMatch}>
        <div slot="header">
          <mc-world-head-submenu
            title=${t('main-world-tour-events-duels')}
            colorTitle="var(--theme-color-yellow)"
            media=${getSquadMedia(this.worldTeam.caps, this.worldTeam.starterIds)}
            navigation="worldTourEventsDuel"
          ></mc-world-head-submenu>
        </div>

        <div slot="main">
          <p>${this.message}</p>

          ${this.result
            ? html`<mc-match-result .match=${this.result}></mc-match-result>`
            : html`<p>Cargando resultado del partido...</p>`}

        </div>
        <div slot="footer-left">
        </div>
        <div slot="footer-right">
          <mc-button
            mode="mini"
            text=${t('main-world-tour-new-back')}
            navigation='worldTourEventsDuel'
          ></mc-button>
        </div>
      </mc-template>
    `;
  }
}

customElements.define('mc-world-events-duel-match', McWorldEventsDuelMatch);
