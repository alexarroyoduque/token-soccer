import { LitElement, html, css } from 'lit-element';
import {getSquadMedia, filterByIds, findIndex, calculatePerformance} from './helpers/helpers.js'

import { map } from 'lit/directives/map.js';

import './mc-world-head-submenu.js';
import './mc-button-core.js';
import './mc-button.js';
import './mc-template.js';
import './mc-cap.js';
import './mc-formation.js';

export class McWorldSquad extends LitElement {
  static get properties() {
    return {
      worldTeam: { type: Object },
      selectedCap: { type: Object },
      capsCalled: { type: Array },
      capsReserve: { type: Array },
      isReservesOpen: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.isReservesOpen = false;
    this.selectedCap = {};
    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam')) || {};
    this.capsCalled = [
      ...filterByIds(this.worldTeam.starterIds, this.worldTeam.caps),
      ...filterByIds(this.worldTeam.benchIds, this.worldTeam.caps)
    ];
    this.capsReserve = [
      ...filterByIds(this.worldTeam.reserveIds, this.worldTeam.caps)
    ];
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

      .action-bar mc-button {
        --mc-button-width: 9rem;
      }
    `;
  }

  handleClick(cap) {
    console.log('handleClick', cap);
  
    if (!this.selectedCap.name) {
      this.selectedCap = cap;
      return;
    }
  
    if (this.selectedCap.id === cap.id) {
      this.selectedCap = {};
      return;
    }
  
    const swapPositions = (cap1, cap2, list1, list2, isBench1, isBench2, isReserve1, isReserve2) => {
      const capIndex1 = findIndex(list1, cap1.id);
      const capIndex2 = findIndex(list2, cap2.id);
      
      list1[capIndex1] = cap2.id;
      list2[capIndex2] = cap1.id;
  
      if (!isBench1 && !isReserve1) {
        this.worldTeam.formation[cap1.positionPath.global][cap1.positionPath.group].capId = cap2.id;
      }
      if (!isBench2 && !isReserve2) {
        this.worldTeam.formation[cap2.positionPath.global][cap2.positionPath.group].capId = cap1.id;
      }
  
      const cap1OriginalPositionActive = cap1.positionActive;
      const cap1OriginalPositionPath = cap1.positionPath;
  
      this.worldTeam.caps.find(item => item.id === cap1.id).positionActive = cap2.positionActive;
      this.worldTeam.caps.find(item => item.id === cap1.id).positionPath = cap2.positionPath;
      this.worldTeam.caps.find(item => item.id === cap2.id).positionActive = cap1OriginalPositionActive;
      this.worldTeam.caps.find(item => item.id === cap2.id).positionPath = cap1OriginalPositionPath;
    };
  
    const isCap1Bench = this.selectedCap.positionPath.global === 'bench';
    const isCap1Reserve= this.selectedCap.positionPath.global === 'reserve';
    const isCap2Bench = cap.positionPath.global === 'bench';
    const isCap2Reserve = cap.positionPath.global === 'reserve';
  
    if (!isCap1Bench && !isCap2Bench && !isCap1Reserve && !isCap2Reserve) {
      swapPositions(this.selectedCap, cap, this.worldTeam.starterIds, this.worldTeam.starterIds, false, false, false, false);
    } else if (isCap1Bench && isCap2Bench && !isCap1Reserve && !isCap2Reserve) {
      swapPositions(this.selectedCap, cap, this.worldTeam.benchIds, this.worldTeam.benchIds, true, true, false, false);
    } else if (!isCap1Bench && isCap2Bench && !isCap1Reserve && !isCap2Reserve) {
      swapPositions(this.selectedCap, cap, this.worldTeam.starterIds, this.worldTeam.benchIds, false, true, false, false);
    } else if (isCap1Bench && !isCap2Bench && !isCap1Reserve && !isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.benchIds, this.worldTeam.starterIds, true, false, false, false);
    } else if (!isCap1Bench && !isCap2Bench && isCap1Reserve && isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.reserveIds, this.worldTeam.reserveIds, false, false, true, true);
    } else if (!isCap1Bench && !isCap2Bench && !isCap1Reserve && isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.starterIds, this.worldTeam.reserveIds, false, false, true, true);
    } else if (!isCap1Bench && !isCap2Bench && isCap1Reserve && !isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.reserveIds, this.worldTeam.starterIds, false, false, true, true);
    } else if (isCap1Bench && !isCap2Bench && !isCap1Reserve && isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.benchIds, this.worldTeam.reserveIds, false, false, true, true);
    } else if (!isCap1Bench && isCap2Bench && isCap1Reserve && !isCap2Reserve){
      swapPositions(this.selectedCap, cap, this.worldTeam.reserveIds, this.worldTeam.benchIds, false, false, true, true);
    }
  
    calculatePerformance(this.worldTeam.starterIds, this.worldTeam.caps);
    calculatePerformance(this.worldTeam.benchIds, this.worldTeam.caps);
    calculatePerformance(this.worldTeam.reserveIds, this.worldTeam.caps);
    localStorage.setItem('worldTeam', JSON.stringify(this.worldTeam));
    this.capsCalled = [
      ...filterByIds(this.worldTeam.starterIds, this.worldTeam.caps),
      ...filterByIds(this.worldTeam.benchIds, this.worldTeam.caps)
    ];
    this.capsReserve = [
      ...filterByIds(this.worldTeam.reserveIds, this.worldTeam.caps)
    ];
    this.selectedCap = {};

    this.shadowRoot.querySelector('mc-formation').requestUpdate();
  }

  handleReservesToggle(){
    console.log('handleReservesToggle')
    this.isReservesOpen = !this.isReservesOpen;
    this.shadowRoot.querySelector('mc-template').requestUpdate();

  }

  render() {
    return html`
      <mc-template ?showActionBarBelow=${!this.isReservesOpen ? true : false} @reservesToggle=${this.handleReservesToggle}>
        <div slot="header">
          <mc-world-head-submenu
            title=${!this.isReservesOpen ? 'Alineación' : 'Reservas'}
            colorTitle="var(--theme-color-yellow)"
            media=${getSquadMedia(this.worldTeam.caps, this.worldTeam.starterIds)}
            navigation="worldTourMain"
          ></mc-world-head-submenu>
        </div>
        <div class="action-bar" slot="action-bar-left">
          <mc-button
            mode="mini"
            text="asignar experiencia"
            action='addExp'
          ></mc-button>
        </div>
        <div class="action-bar" slot="action-bar-right">
        </div>

        <div slot="action-bar-below">
          <mc-formation .starterIds="${[...this.worldTeam.starterIds]}"></mc-formation>
        </div>

        <div slot="main">
          <div ?hidden=${this.isReservesOpen}>
            ${map(this.capsCalled, (i) => html`
              <mc-cap
                ?isSelected=${this.selectedCap.id === i.id}
                @click=${() => this.handleClick(i)}
                name=${i.name}
                positionFavorite=${i.positionFavorite}
                imageUrl=${i.imageUrl}
                media=${i.media}
                mediaReal=${i.mediaReal}
                condition=${i.condition}
                level=${i.level}
                points=${i.points}
                durability=${i.durability}
                positionActive=${i.positionActive}
              ></mc-cap>
            `)}
          </div>

          <div ?hidden=${!this.isReservesOpen}>
            ${map(this.capsReserve, (i) => html`
              <mc-cap
                ?isSelected=${this.selectedCap.id === i.id}
                @click=${() => this.handleClick(i)}
                name=${i.name}
                positionFavorite=${i.positionFavorite}
                imageUrl=${i.imageUrl}
                media=${i.media}
                mediaReal=${i.mediaReal}
                condition=${i.condition}
                level=${i.level}
                points=${i.points}
                durability=${i.durability}
                positionActive=${i.positionActive}
              ></mc-cap>
            `)}
          </div>

        </div>
        <div slot="action-bar-above-footer-left">Above Footer Left</div>
        <div slot="action-bar-above-footer-center">Above Footer Center</div>
        <div slot="action-bar-above-footer-right">Above Footer Right</div>
        <div slot="footer-left" class="section">
          <mc-button
            mode="mini"
            text="vista"
            action='view'
          ></mc-button>
        </div>
        <div slot="footer-center" class="section">
          <mc-button
            mode="mini"
            text="formación"
            action='formation'
          ></mc-button>
        </div>
        <div slot="footer-right" class="section">
          <mc-button
            mode="mini"
            text="${!this.isReservesOpen ? 'reservas' : 'convocatoria'}"
            action='reservesToggle'
          ></mc-button>
        </div>
      </mc-template>
    `;
  }
}

customElements.define('mc-world-squad', McWorldSquad);
