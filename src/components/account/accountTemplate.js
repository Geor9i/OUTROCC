import { html } from "../../../node_modules/lit-html/lit-html.js";

export const accountTemplate = (employee, editInfo, editEmail, deleteHandler) => 
    html`
      <section id="edit">
            <div class="form">
                    <h2 id="account-title">User Details</h2>
              <form class="edit-form" @submit=${(e) => editInfo(e, employee)}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  .value="${employee.firstName}"/>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  .value="${employee.surname}"/>
                <button type="submit">Update</button>
              </form>
              
            </div>
          </section>
          <section id="edit">
            <div class="form">
                    <h2 id="account-title">Account Settings</h2>
              <form class="edit-form" @submit=${(e) => editEmail(e, employee)}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  .value="${employee.email}"/>
                <button type="submit">Update Email</button>
              </form>
            </div>
          </section>
          <div class="delete-btn-container">
            <button id="delete-account-btn" @click=${(e) => deleteHandler(e,employee)}>Delete Account</button>
        </div>
    `;