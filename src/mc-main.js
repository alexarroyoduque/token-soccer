import { LitElement, html, css } from 'lit-element';
import './mc-language.js';
import './mc-main-menu.js';
import './mc-world-welcome.js';
import './mc-world-new.js';
import './mc-world-main.js';
import './mc-world-squad.js';
import './mc-world-events.js';
import './mc-world-events-duel.js';
import './mc-world-events-duel-match.js';


export class McMain extends LitElement {
  static get properties() {
    return {
      currentPage: { type: String },
      payload: { type: Object }
    };
  }

  constructor() {
    super();
    this.currentPage = 'language';
    this.payload = {};
    
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --theme-primary-font-family:  'Bebas Neue', sans-serif;
        --theme-secondary-font-family: 'Titillium Web', sans-serif;
        --theme-mono-font-family: 'Noto Sans Mono', monospac;

        --theme-background-main: url(https://img.freepik.com/premium-photo/soft-neon-blue-gradient-abstract-background-design_973208-58.jpg);
        --theme-background-world: url(https://img.freepik.com/free-vector/abstract-background-with-northern-lights_23-2148191036.jpg);

        --theme-color-green: #00ff4c;
        --theme-color-blue: #5be7ff;
        --theme-color-yellow: #faff00;
        --theme-color-gray-light: #eee;
        --theme-color-gray: #808080;

        --theme-color-primary: var(--theme-color-green);
        --theme-color-secondary: var(--theme-color-light);

        margin: 0px auto;

        background-color: #d3ec6d;
      }

      mc-main-menu {
        --mc-main-menu-font-primary: var(--theme-primary-font-family);
        --mc-main-menu-font-secondary: var(--theme-secondary-font-family);
      }
    `;
  }

  _navigate(page, payload) {
    this.currentPage = page;
    this.payload = payload;
    console.log('_navigate', page, payload)
  }   

  render() {
    return html`

      <section>
        ${this.currentPage === 'language' ? html`<mc-language @navigate="${(e) => this._navigate(e.detail.page)}"></mc-language>` : ''}
        ${this.currentPage === 'main' ? html`<mc-main-menu @navigate="${(e) => this._navigate(e.detail.page)}"></mc-main-menu>` : ''}
        ${this.currentPage === 'worldWelcome' ? html`<mc-world-welcome @navigate="${(e) => this._navigate(e.detail.page)}"></mc-world-welcome>` : ''}
        ${this.currentPage === 'worldTourNew' ? html`<mc-world-new @navigate="${(e) => this._navigate(e.detail.page)}"></mc-world-new>` : ''}
        ${this.currentPage === 'worldTourMain' ? html`<mc-world-main @navigate="${(e) => this._navigate(e.detail.page)}"></mc-world-main>` : ''}
        ${this.currentPage === 'worldTourSquad' ? html`<mc-world-squad @navigate="${(e) => this._navigate(e.detail.page)}"></mc-world-squad>` : ''}
        ${this.currentPage === 'worldTourEvents' ? html`<mc-world-events @navigate="${(e) => this._navigate(e.detail.page)}"></mc-world-events>` : ''}
        ${this.currentPage === 'worldTourEventsDuel' ? html`<mc-world-events-duel @navigate="${(e) => this._navigate(e.detail.page, e.detail.payload)}"></mc-world-events-duel>` : ''}
        ${this.currentPage === 'worldTourEventsDuelMatch' ? html`<mc-world-events-duel-match .selectedDuel=${this.payload} @navigate="${(e) => this._navigate(e.detail.page, e.detail.payload)}"></mc-world-events-duel-match>` : ''}
      </section>

    `;
  }


}

customElements.define('mc-main', McMain);
