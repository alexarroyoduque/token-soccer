import { LitElement, html, css } from 'lit-element';
import {t} from './helpers/helpers.js'
import './mc-button.js';


export class McCap extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      positionFavorite: { type: String },
      imageUrl: { type: String },
      media: { type: String },
      mediaReal: { type: String },
      level: { type: Number },
      points: { type: Number },
      condition: { type: Number },
      durability: { type: Number },
      positionActive: { type: String },
      isSelected: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.isSelected = false;
  }

  positionColor(positionActive, positionFavorite) {
    let positionToUse = positionActive;
    if (positionActive === 'bench' || positionActive === 'reserve') {
      positionToUse = positionFavorite;
    }

    let color = '#ffbe00';
    console.log(positionToUse)

    switch (positionToUse) {
      case 'goalkeeper':
        color = '#ffbe00';
        break;
      case 'defender central':
        color = '#80d9fa';
        break;
      case 'lateral left':
        color = '#80d9fa';
        break;
      case 'lateral right':
        color = '#80d9fa';
        break;
      case 'midfielder defensive':
        color = '#6ccf56';
        break;
      case 'midfielder offensive':
        color = '#6ccf56';
        break;
      case 'winger':
        color = '#ff5571';
        break;
      case 'forward':
        color = '#ff5571';
        break;
      default:
        color = '#000';
        break;
    }

    return color;
  }

  getShortPosition(positionActive, positionFavorite) {
    let positionToUse = positionActive;
    if (positionActive === 'bench' || positionActive === 'reserve') {
      positionToUse = positionFavorite;
    }

    let short = positionToUse;
    switch (positionToUse) {
      case 'goalkeeper':
        short = 'POR'
        break;
      case 'defender central':
        short = 'CT'
        break;
      case 'lateral left':
        short = 'LI'
        break;
      case 'lateral right':
        short = 'LD'
        break;
      case 'midfielder defensive':
        short = 'MDE'
        break;
      case 'midfielder offensive':
        short = 'MOF'
        break;
      case 'winger':
        short = 'EXT'
        break;
      case 'forward':
        short = 'DEL'
        break;
      default:
        short = 'xxx';
        break;
    }

    return short;
  }

  getExpAction(points) {
    return points > 0 ? `addExp` : 'resetExp';
  }

  getExpText(points) {
    return points > 0 ? `asignar experiencia + ${points}` : 'Reasignar experiencia';
  }

  getpositionActiveText(positionActive) {
    let text = positionActive;
    if (positionActive === 'bench') {
      text = 'Banquillo';
    } else if (positionActive === 'reserve'){
      text = 'Reserva';
    }

    return text;
  }


  static get styles() {
    return css`
      .card {
        display: flex;
        flex-direction: column;
        width: 300px;
        padding: 0;
        margin: .4rem 0;
        background-color: var(--theme-color-gray-light);
        border: 2px solid var(--theme-color-gray-light);
        box-sizing: border-box;
        font-family: var(--theme-mono-font-family);
        background: linear-gradient(30deg, var(--theme-color-gray-light) 70%, rgba(177, 177, 177, 1) 100%);
      }

      .top-section {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        height: 2rem;
        font-weight: 500;
        font-size: 1rem;
      }

      .position {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.3rem;
        color: white;
        font-weight: 800;
        background-color: #535353;
        height: calc(100% - 4px);
        margin-right: 0.4rem;
        border-bottom: 4px solid #ffbe00;
        min-width: 1.8rem;

      }

      .image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .name {
        flex: 1; /* Ocupa todo el espacio restante */
        white-space: nowrap; /* Evita que el texto se divida en varias líneas */
        overflow: hidden; /* Oculta cualquier desbordamiento de texto */
        text-overflow: ellipsis; /* Añade puntos suspensivos al texto desbordado */
      }

      .media {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.3rem;
        color: #ea0060;
        height: 100%;
        margin-left: auto;
        color: #000000;
        text-shadow: 0 0 10px var(--theme-color-green);
      }

      .media.false {
        text-shadow: 0 0 10px #ea0060;
      }

      .media.false::before {
        content: '▼';
        margin-top: 0.4rem;
        font-size: 0.8rem;
        color: #ea0060;
      }

      .middle-section {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        font-size: 0.8rem;
      }

      .level,
      .points {
        flex: 1;
        margin-right: 0.2rem;
        padding: 0 0.3rem;
      }

      .assign {
        margin-right: .3rem;
      }

      .assign span {
        background-color: #c4f2cc;
        padding: 0 .2rem;
      }

      .condition-section, .durability-section {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        position: relative;
      }

      .bar {
        width: 50%;
        height: 0.8rem;
        background-color: #a2a2a2;
        margin-right: 0.5rem;
      }

      .condition-section::before {
        content: 'condición';
        position: absolute;
        z-index: 99;
        color: white;
        text-shadow: 0 0 2px black;
        font-size: .7rem;
        line-height: 1;
      }

      .durability-section::before {
        content: 'durabilidad';
        position: absolute;
        z-index: 99;
        color: white;
        text-shadow: 0 0 2px black;
        font-size: .7rem;
        line-height: 1;
      }

      .fill {
        height: 100%;
      }

      .status {
        font-size: .7rem;
        color: #535353;
        line-height: 0;
      }

      .bench,
      .reserve{
        opacity: .8;
      }

      .selected {
        box-shadow: 0px 0px 0px 4px var(--theme-color-green);
      }
    `;
  }

  render() {
    return html`
      <div class="card ${this.positionActive} ${this.isSelected ? 'selected':''}">
        <div class="top-section">
          <div class="position" style="border-bottom-color: ${this.positionColor(this.positionActive, this.positionFavorite)};">${this.getShortPosition(this.positionActive, this.positionFavorite)}</div>
          <img class="image" src="${this.imageUrl}" alt="Image" />
          <div class="name">${this.name}</div>
          <div class="media ${this.media === this.mediaReal}">${this.mediaReal}</div>
        </div>
        <div class="middle-section">
          <div class="level">${t('main-world-tour-squad-level')}: ${this.level}</div>
          <div class="assign">
            <span ?hidden=${this.points === 0}>Puntos disponibles</span>
          </div>
        </div>
        <div class="condition-section">
          <div class="bar">
            <div class="fill" style="width: ${this.condition}%; background-color: #007bff;"></div>
          </div>
          <div class="status">${this.positionFavorite}</div>
          </div>
        <div class="durability-section">
          <div class="bar">
            <div class="fill" style="width: ${this.durability}%; background-color: #6d1cc9;"></div>
          </div>
          <div class="status">${this.getpositionActiveText(this.positionActive)}</div>

        </div>
      </div>
    `;
  }
}

customElements.define('mc-cap', McCap);
