import { html } from "../../../node_modules/lit-html/lit-html.js";

export const registerTemplate = (submitHandler) => html`
  <section id="register">
          <div class="form" @submit=${submitHandler}>
            <h2>Register</h2>
            <form class="register-form">
              <input
                type="text"
                name="firstName"
                id="first-name"
                placeholder="First Name"
              />
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
              />
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
      `;
