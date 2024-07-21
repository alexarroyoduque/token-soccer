import { LitElement, html, css } from 'lit-element';

export class McTemplate extends LitElement {
  static get properties() {
    return {
      showActionBar: { type: Boolean },
      showActionBarBelow: { type: Boolean },
      showActionBarAboveFooter: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
      }

      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .header, .footer, .action-bar, .action-bar-below, .action-bar-above-footer {
        background-color: rgba(255, 255, 255, 0.25);
        padding: 0.5rem;
        text-align: center;
        color: white;
      }

      .header {
        flex: 0 0 2rem;
      }

      .action-bar {
        flex: 0 0 2rem;
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .action-bar .section,
      .action-bar-above-footer .section {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .action-bar-below {
        flex: 0 0 2rem;
        background-color: rgba(255, 255, 255, 0.25);
        padding: 0.5rem;
        text-align: center;
        color: white;
      }

      .action-bar-below-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .action-bar-above-footer {
        flex: 0 0 2rem;
        background-color: rgba(255, 255, 255, 0.25);
        padding: 0.5rem;
        text-align: center;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .main {
        flex: 1;
        padding: 0.5rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 0 0 2rem;
      }

      .footer .section {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.showActionBar = false;
    this.showActionBarBelow = false;
    this.showActionBarAboveFooter = false;
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <slot name="header"></slot>
        </div>
        ${this.showActionBar ? html`
          <div class="action-bar">
            <div class="section">
              <slot name="action-bar-left"></slot>
            </div>
            <div class="section">
              <slot name="action-bar-center"></slot>
            </div>
            <div class="section">
              <slot name="action-bar-right"></slot>
            </div>
          </div>
        ` : ''}
        ${this.showActionBarBelow ? html`
          <div class="action-bar-below">
            <div class="action-bar-below-content">
              <slot name="action-bar-below"></slot>
            </div>
          </div>
        ` : ''}
        <div class="main">
          <slot name="main"></slot>
        </div>
        ${this.showActionBarAboveFooter ? html`
          <div class="action-bar-above-footer">
            <div class="section">
              <slot name="action-bar-above-footer-left"></slot>
            </div>
            <div class="section">
              <slot name="action-bar-above-footer-center"></slot>
            </div>
            <div class="section">
              <slot name="action-bar-above-footer-right"></slot>
            </div>
          </div>
        ` : ''}
        <div class="footer">
          <div class="section">
            <slot name="footer-left"></slot>
          </div>
          <div class="section">
            <slot name="footer-center"></slot>
          </div>
          <div class="section">
            <slot name="footer-right"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('mc-template', McTemplate);
