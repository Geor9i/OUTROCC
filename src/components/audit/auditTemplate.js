import { html } from "../../../node_modules/lit-html/lit-html.js";

export const auditTemplate = (auditMembers, test) => html`
  <section>
    <div class="audit-main-container">
      <div class="audit-question-container">
        <p class="audit-question">test.title</p>
      </div>
      <div class="audit-answer-container">
      ${test.options.map(q => {
        html`
        <div class="answer-container">
          <p>${q}</p>
        </div>`
      })}
        </div>
    </div>
   </section>
  `;
 