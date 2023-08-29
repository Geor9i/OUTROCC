import { html } from "../../../node_modules/lit-html/lit-html.js";

export const accountTemplate = (employee, editInfo, editEmail, changePassword,deleteHandler) => 
    html`
      <section>
            <div class="form">
                    <h2 id="account-title">User Info</h2>
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

          <section>
            <div class="form">
                    <h2 id="account-title">Change Password</h2>
              <form class="edit-form" @submit=${changePassword}>
                <input
                  type="password"
                  name="password"
                  placeholder="Type a new password" />
                <input
                  type="password"
                  name="repass"
                  placeholder="Repeat your new passsword" />
                <button type="submit">Change Password</button>
              </form>
            </div>
          </section>

          <section>
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