import { LitElement, html, css } from 'lit-element';

import './mc-button.js';


export class McCardDuel extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      positionFavorite: { type: String },
      imageUrl: { type: String },
      media: { type: String },
      price: { type: String },
      mediaReal: { type: String },
      mediaCap: { type: String },
      mediaSquad: { type: String },
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

      .middle-section,
      .last-section {
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.1rem;
        font-size: 0.8rem;
        flex-direction: column;
      }

      .status {
        font-size: .7rem;
        color: #535353;
        line-height: 0;
      }

      .selected {
        box-shadow: 0px 0px 0px 4px var(--theme-color-green);
      }
    `;
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

  render() {
    return html`
      <div class="card ${this.isSelected ? 'selected':''}">
        <div class="top-section">
          <div class="position">${this.getShortPosition(this.positionFavorite, this.positionFavorite)}</div>
          <img class="image" src="${this.imageUrl}" alt="Image" />
          <div class="name">${this.name}</div>
          <div class="media">${this.mediaCap}</div>
        </div>
        <div class="middle-section">
          <div>Media del equipo rival ${this.mediaSquad}</div>
          <div >Coste del desafío ${this.price}€</div>
        </div>
      </div>
    `;
  }
}

customElements.define('mc-card-duel', McCardDuel);
