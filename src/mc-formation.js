import { LitElement, html, css } from 'lit';

class McFormation extends LitElement {
  static get properties() {
    return {
      starterIds: {
        type: Array,
        hasChanged(value, oldValue) {
          return JSON.stringify(value) !== JSON.stringify(oldValue);
        }
      }
    };
  }

  constructor() {
    super();
    this.starterIds = [];
    this.worldTeam = JSON.parse(localStorage.getItem('worldTeam')) || { caps: [] };

    console.log('worldTeam:', this.worldTeam);
    this.caps = this.filterByIds(this.worldTeam.starterIds, this.worldTeam.caps);
    console.log('caps:', this.caps);
  }

  updated(changedProperties) {
    console.log(changedProperties)
    if (changedProperties.has('starterIds')) {
      
      this.caps = this.filterByIds(this.starterIds, this.worldTeam.caps);
      this.requestUpdate();
    }
  }

  static get styles() {
    return css`
      .field {
        width: 300px;
        height: 160px;
        background-image: url('https://www.huck-net.co.uk/media/img/images/Lines_On_A_Football_Pitch.jpg');
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
      }
      .field::before {
        content: attr(data-tactic);
        position: absolute;
        top: 0px;
        background-color: black;
        font-size: 1rem;
        padding: .1rem;
        font-family: var(--theme-mono-font-family);
        border-radius: 0 0 6px 6px;
      }

      .column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }
      .cap {
        width: 30px;
        height: 30px;
        background-color: white;
        box-shadow: 0px 0px 4px 0px black;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;       
        background-size: cover; 
      }
      .cap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cap::before {
        content: attr(data-media-real);
        font-family: var(--theme-mono-font-family);
        top: 18px;
        left: 0px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: .7rem;
        padding: 2px;
        border-radius: 50%;
        margin-top: 20px;
        margin-right: 20px;
        font-weight: 500;
      }
      .empty {
        visibility: hidden;
        width: 30px;
        height: 30px;
      }
    `;
  }

  filterByIds(arrayIds, collection) {
    return arrayIds.map(id => collection.find(item => item.id === id));
  }

  render() {
    const formations = {
      '4-4-2': [
        [0],             // Portero
        [1, 2, 3, 4],    // Defensas
        ['', 5, 6, ''],  // Mediocampistas centrales
        [7, 8],          // Mediocampistas ofensivos
        ['', 9, 10, '']  // Delanteros
      ],
      '4-3-3': [
        [0],             // Portero
        [1, 2, 3, 4],    // Defensas
        ['', 5, ''],  // Mediocampistas centrales
        [6, 7],          // Mediocampistas ofensivos
        [8, 9, 10]  // Delanteros
      ]
    }

    return html`
      <div class="field" data-tactic=${this.worldTeam.formation.id}>
        ${formations[this.worldTeam.formation.id].map(column => html`
          <div class="column">
            ${column.map(id => id !== '' ? html`
              <div class="cap"
                style='background-image: url(${this.caps[id].imageUrl})'
                data-media-real=${this.caps[id].mediaReal}
                >
              </div>
            ` : html`
              <div class="empty"></div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('mc-formation', McFormation);
