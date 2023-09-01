import { html } from "../../../node_modules/lit-html/lit-html.js";

export const auditTemplate = (category, test, testAnswer) => html`
  <section>
    <div class="audit-main-container">
      <div class="audit-question-container">
        <div>
          <p class="audit-question" data-category=${category} data-id=${test.score}>${test.title}</p>
        </div>
        <div @click=${testAnswer} class="audit-not-observed-container">
          <p class="not-observed-btn">Not Observed</p>
        </div>
      </div>
      <div class="audit-answer-container">
        ${test.options.map(q => html`
          <div @click=${testAnswer} class="answer-container">
            <p >${q}</p>
          </div>
        `)}
      </div>
    </div>
  </section>
`;
