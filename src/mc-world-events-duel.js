import { LitElement, html, css } from 'lit-element';
import { map } from 'lit/directives/map.js';
import {getSquadMedia, filterByIds, findIndex, calculatePerformance, t} from './helpers/helpers.js'

import './mc-world-head-submenu.js';
import './mc-button-core.js';
import './mc-button.js';
import './mc-template.js';
import './mc-card-duel.js';

export class McWorldEventsDuel extends LitElement {
  static get properties() {
    return {
      worldTeam: { type: Object },
      selectedDuel: { type: Object }
    };
  }

  constructor() {
    super();
    this.selectedDuel = {};

    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam')) || {};
    this.worldDuels = JSON.parse(localStorage.worldDuels).filter(duel => duel.completed === false);
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

      .extended mc-button {
        --mc-button-width: 8rem;
      }

      .cash {
        font-family: var(--theme-primary-font-family);
        color: var(--theme-color-yellow);
        padding: 0.1rem;
        font-size: 1.3rem;
        margin: 0px;
      }
    `;
  }

  handleClick(item) {
    console.log('handleClick', item);
  
    if (!this.selectedDuel.name) {
      this.selectedDuel = item;
      return;
    }
  
    if (this.selectedDuel.name === item.name) {
      this.selectedDuel = {};
      return;
    }

  }

  handlePlayMatch() {
    console.log('handlePlayMatch VS: ', this.selectedDuel.name)

    this.worldTeam.cash -= this.selectedDuel.price;
    localStorage.setItem('worldTeam', JSON.stringify(this.worldTeam));
  }

  render() {
    return html`
      <mc-template ?showActionBar=${true} @playMatch=${this.handlePlayMatch}>
        <div slot="header">
          <mc-world-head-submenu
            title=${t('main-world-tour-events-duels')}
            colorTitle="var(--theme-color-yellow)"
            media=${getSquadMedia(this.worldTeam.caps, this.worldTeam.starterIds)}
            navigation="worldTourEvents"
          ></mc-world-head-submenu>
        </div>

        <div class="cash" slot="action-bar-center">
          ${this.worldTeam.cash}€
        </div>

        <div slot="main" class="button-container">
          ${map(this.worldDuels, (i) => html`
              <mc-card-duel
                ?isSelected=${this.selectedDuel.name}
                @click=${() => this.handleClick(i)}
                name=${i.name}
                positionFavorite=${filterByIds([i.capRewardId], i.caps)[0].positionFavorite}
                imageUrl=${filterByIds([22], i.caps)[0].imageUrl}
                mediaCap=${filterByIds([22], i.caps)[0].media}
                price=${i.price}
                mediaSquad=${getSquadMedia(i.caps, i.starterIds)}
              ></mc-card-duel>
            `)}
          </div>
        </div>
        <div slot="footer-left" class="extended">
            <mc-button
              ?disabled=${!this.selectedDuel.name}
              mode="mini"
              text=${t('main-world-tour-events-duels-squad')}
              action='ss'
            ></mc-button>
        </div>
        <div slot="footer-right" class="extended">
          <mc-button
            ?disabled=${!this.selectedDuel.name || this.worldTeam.cash <= this.selectedDuel.price }
            mode="mini"
            text=${t('main-world-tour-events-duels-play')}
            .payload=${this.selectedDuel}
            navigation='worldTourEventsDuelMatch'
            action="playMatch"
          ></mc-button>
        </div>
      </mc-template>
    `;
  }
}

customElements.define('mc-world-events-duel', McWorldEventsDuel);
