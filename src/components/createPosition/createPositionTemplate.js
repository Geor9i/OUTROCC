import { html } from "../../../node_modules/lit-html/lit-html.js";


export const createPositionTemplate = (submitHandler) => html`
   <section id="create">
          <div class="form">
            <h2>Create Position</h2>
            <form class="create-form" @submit=${submitHandler}>
              <input
                type="text"
                name="positionName"
                placeholder="Position Name"
              />
              <button type="submit">Add Position</button>
            </form>
          </div>
        </section>`;
