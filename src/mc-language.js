import { LitElement, html, css } from 'lit-element';

export class McLanguage extends LitElement {
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
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px; /* Espacio lateral */
      box-sizing: border-box;
      background-color: #5d5d5d;

    }
    .container {
      display: grid;
      grid-template-columns: 1fr;
      gap: .5rem;
      text-align: center;
    }
    `;
  }

  handleLanguage(lang) {
    console.log('handleLanguage', lang)
    localStorage.setItem('tokenSoccerLang', lang);
  }

  render() {
    return html`
      <div class="container">
        <mc-button
        @setLanguage=${() => this.handleLanguage('es')}
        text="Español"
        action='setLanguage'
        navigation='main'
        color="var(--theme-color-gray-light)"
        ></mc-button>
        <mc-button
        @setLanguage=${() => this.handleLanguage('en')}
        text="English"
        action='setLanguage'
        navigation='main'
        color="var(--theme-color-gray-light)"
        ></mc-button>

      </div>
    `;
  }




}

customElements.define('mc-language', McLanguage);
