import { LitElement, html, css } from 'lit-element';

export class McMatchResult extends LitElement {

    static get properties() {
      return {
        match: { type: Object }
      };
    }

    constructor() {
      super();
      this.match = {
          team1: {
              name: "",
              goals: 0,
              possession: 0,
              scorers: []
          },
          team2: {
              name: "",
              goals: 0,
              possession: 0,
              scorers: []
          }
      };
    }

    static get styles() {
        return css`
            :host {
              display: flex;
              justify-content: center;
              margin: 0;
              color: white;
              font-family: var(--theme-mono-font-family);
            }
            .match-result {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #2e2e2e;
                padding: .4rem;
                border-radius: 4px;
                max-width: 600px;
            }
            .teams {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
            .team {
                text-align: center;
                width: 45%;
            }
            .team-name {
                font-size: 1.5rem;
                font-family: var(--theme-primary-font-family);

            }
            .score {
                font-size: 1.5rem;
                margin: 0 0 1rem;
            }
            .possession {
                font-size: 16px;
            }
            .scorers {
                margin-top: 10px;
            }
            .scorer {
                font-size: .9rem;
                margin: 5px 0;
            }
        `;
    }

    render() {
        const { match } = this;
        return html`
            <div class="match-result">
                <div class="teams">
                    <div class="team">
                        <div class="team-name">${match.team1.name}</div>
                        <div class="score">${match.team1.goals}</div>
                        <div class="possession">Posesión: ${match.team1.possession}%</div>
                        <div class="scorers">
                            ${match.team1.scorers.map(
                                scorer => html`<div class="scorer">${scorer.name} (${scorer.minutes.join(', ')})</div>`
                            )}
                        </div>
                    </div>
                    <div class="team">
                        <div class="team-name">${match.team2.name}</div>
                        <div class="score">${match.team2.goals}</div>
                        <div class="possession">Posesión: ${match.team2.possession}%</div>
                        <div class="scorers">
                            ${match.team2.scorers.map(
                                scorer => html`<div class="scorer">${scorer.name} (${scorer.minutes.join(', ')})</div>`
                            )}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('mc-match-result', McMatchResult);
