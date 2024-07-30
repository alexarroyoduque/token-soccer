import { LitElement, html, css } from 'lit-element';
import { getFormation, calculatePerformance, t} from './helpers/helpers.js'

import './mc-title-jumbo.js';
import './mc-button.js';

export class McWorldNew extends LitElement {
  static get properties() {
    return {
      allCaps: {type: Array},
      teamName: {type: String}
    };
  }

  constructor() {
    super();
    this.allCaps = [];
    this.teamName = '';
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

      li:last-child {
        margin-top: 2rem;
      }

      label {
        display: inline-block;
        margin-top: 1rem;
        color: var(--theme-color-blue);
        font-family: var(--theme-primary-font-family);
      }

    `;
  }

  assignStarters(team, tactic) {
    // Copiar la formación elegida
    const formation = JSON.parse(JSON.stringify(getFormation(tactic).formation));
    
    // Asignar cada posición del objeto de formación el capId correspondiente
    let starters = [];
    let bench = [];
    let reserves = [];

    // Clasificar las chapas
    team.caps.forEach(cap => {
        if (starters.length < 11) {
            starters.push(cap);
        } else if (bench.length < 7) {
          cap.positionActive = 'bench';
          cap.positionPath = {
            global: 'bench',
            group: 'bench'
          };
            bench.push(cap);
        } else {
          cap.positionActive = 'reserve';
          cap.positionPath = {
            global: 'reserve',
            group: 'reserve'
          };
          reserves.push(cap);
        }
    });

    // Asignar capIds y positionActive en la formación
    let starterIndex = 0;
    for (const section in formation) {
        if (section === 'id') continue;
        for (const position in formation[section]) {
            if (starterIndex < starters.length) {
                const cap = starters[starterIndex];
                formation[section][position].capId = cap.id;
                cap.positionActive = formation[section][position].type;
                cap.positionPath = {
                    global: section,
                    group: position
                };
                starterIndex++;
            }
        }
    }

    // Crear propiedades en el equipo
    team.formation = formation;
    team.starterIds = starters.map(cap => cap.id);
    team.benchIds = bench.map(cap => cap.id);
    team.reserveIds = reserves.map(cap => cap.id);

    return team;
}

  async _handleAction(ev) {
    console.log('_handleAction');
    console.log(ev);

    let allCaps = await this._loadCSV('src/database/allCaps.csv');
    // Transformar el JSON resultante para agrupar las propiedades de stats
    this.allCaps = allCaps.map(this._groupStatsProperties);
    this._storageCaps(this.allCaps);

    let worldTourDuels = await this._loadCSV('src/database/worldTourDuels.csv');
    this.requestUpdate();

    let worldDuelsStorage = [];
    worldTourDuels.forEach(duel => {
      var duelTeam = this.createTeam(duel.name, JSON.parse(duel.starterIds));
      duelTeam = this.assignStarters(duelTeam, '4-3-3');
      duelTeam.capRewardId = duel.capRewardId;
      duelTeam.price = duel.price;
      duelTeam.completed = false;
      calculatePerformance(duelTeam.starterIds, duelTeam.caps);
      worldDuelsStorage.push(duelTeam);
    });
    
    localStorage.setItem('worldDuels', JSON.stringify(worldDuelsStorage));

    let worldTeam = this.createTeam(this.teamName, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
    worldTeam.cash = 100;
    console.log('worldTeam antes de starters', worldTeam)
    worldTeam = this.assignStarters(worldTeam, '4-4-2');
    calculatePerformance(worldTeam.starterIds, worldTeam.caps);
    localStorage.setItem('worldTeam', JSON.stringify(worldTeam));

    this.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'worldTourMain' }, bubbles: true, composed: true }));
  }

  createTeam(name, capIds) {
    let caps = [];
    for (let i = 0; i < capIds.length; i++) {
      let cap = this.allCaps.find(item => item.id === capIds[i]);
      cap.team = name;
      cap.performance = 100;
      cap.mediaReal = cap.media;
      caps.push(cap);
    }

    return {
      name,
      caps
    };
  }

  async _loadCSV(path) {
    console.log('_loadCSV');
    try {
      const response = await fetch(path); // Asegúrate de que la ruta sea correcta
      const csvData = await response.text();
      const results = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true
      });

      return results.data;
    } catch (error) {
      console.error('Error loading CSV:', error);
    }
  }

  _groupStatsProperties(item) {
    const stats = {};
    const rest = {};

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (key.startsWith('stats.')) {
          const statKey = key.slice(6); // Remover 'stats.' del inicio
          stats[statKey] = item[key];
        } else {
          rest[key] = item[key];
        }
      }
    }

    return {
      ...rest,
      stats
    };
  }

  _storageCaps(allCaps) {
    localStorage.setItem('allCaps', JSON.stringify(allCaps));
  }

  _handleInput(ev) {
    this.teamName = ev.target.value;
    console.log('teamName', this.teamName)
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
        <label>
          ${t('main-world-tour-new-team-name')}
          
          <input autofocus type="text" @input=${this._handleInput}>
        </label>
        <ul>
          <li>
            <mc-button
              @worldCreateTeam=${this._handleAction}
              text=${t('main-world-tour-new-continue')}
              action='worldCreateTeam'
              color="var(--theme-color-blue)"
              ?disabled=${!this.teamName ? true : false}
              ></mc-button>
          </li>
          <li>
            <mc-button
              text=${t('main-world-tour-new-back')}
              navigation='main'
              color="var(--theme-color-gray-light)"
              ></mc-button>
          </li>
        </ul>
      </section>
    `;
  }

}

customElements.define('mc-world-new', McWorldNew);
