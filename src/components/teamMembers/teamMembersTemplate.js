import { html } from "../../../node_modules/lit-html/lit-html.js";

export const TeamMembersTemplate = (members) => html` <section id="create">
  <div class="team-members-main-container">
    <div class="team-members-main-container-header">
      <h2>Members</h2>
    </div>
    <div class="member-header">
        <div class="member-header-details"><h3>Name</h3></div>
        <div class="member-header-details"><h3>Position</h3></div>
      </div>
    <div class="team-members-container">
      <div class="team-members">
        ${members.length > 0
          ? html`
            
              ${members.map(
                (el) => html`
                  <a href="member-details/${el.id}" class="member">
                    <div class="member-details">
                      <h3>${`${el.firstName} ${el.surname}`}</h3>
                    </div>
                    <div class="member-details">
                      <h3>${Object.keys(el.positions).join(', ')}</h3>
                    </div>
              </a>`
              )}`
          : html`<h2>No Members to display!</h2>`}
      </div>
    </div>
    <div class="add-member-container">
      <a class="add-member" href="/create-employee">Add Member</a>
    </div>
  </div>
</section>`;
