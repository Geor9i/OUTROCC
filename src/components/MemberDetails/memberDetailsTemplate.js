import { html } from "../../../node_modules/lit-html/lit-html.js";

export const memberDetailsTemplate = (member, openDetails, deleteHandler) => html`
  <section>
    <div class="member-details-main-container">
      <div class="member-details-name-container">
        <h2>${member.firstName} ${member.surname}</h2>
      </div>
      <div class="member-details-positions-container">
        <h2>${Object.keys(member.positions).join(', ')}</h2>
      </div>
      <div class="member-details-performance-container">
        <div class="performance-info-container">
          <div class="performance-info">
            <h3>Rating:</h3>
          </div>
          <div class="performance-info">
            <h4>Not yet rated</h4>
          </div>
        </div>
        <div class="performance-info-container">
          <div class="performance-info">
            <h3>Last Performance:</h3>
          </div>
          <div class="performance-info">
            <h4>No Performances yet</h4>
          </div>
        </div>
      </div>
      <div class="performance-details-btn" @click=${openDetails}>
        <h3>Details</h3>
      </div>
      <div class="member-details-details_performance-container inactive">
        <div class="performance-info-container">
          <div class="performance-info">
            <h3 class="grade-text">HandWashing:</h3>
          </div>
          <div class="performance-info-text">
            <h5>Doesn't understand HandWashing procedure</h5>
          </div>
        </div>
        <div class="performance-info-container">
          <div class="performance-info">
            <h3 class="grade-text">Apron Procedure:</h3>
          </div>
          <div class="performance-info-text">
            <h5>Apron down when loading product in 8hd</h5>
          </div>
        </div>
      </div>
      <div class="performance-test-btn">
        <h3>Performance Test</h3>
      </div>
    </div>
  </section>
`;
