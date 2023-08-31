import { html } from "../../../node_modules/lit-html/lit-html.js";

export const auditTemplate = (category, test, testAnswer) => html`
  <section>
    <div class="audit-main-container">
      <div class="audit-question-container">
        <p class="audit-question" data-category=${category} data-id=${test.score}>${test.title}</p>
      </div>
      <div class="audit-answer-container">
        ${test.options.map(q => html`
          <div class="answer-container">
            <p @click=${testAnswer} >${q}</p>
          </div>
        `)}
      </div>
    </div>
  </section>
`;
