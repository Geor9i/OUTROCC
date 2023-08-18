import { html } from "../../../node_modules/lit-html/lit-html.js";


export const createEmployeeTemplate = (submitHandler, positions) => html`
   <section id="create">
          <div class="form">
            <h2>Create Employee</h2>
            <form class="create-form" @submit=${submitHandler}>
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
              <div class="form-checklist">
                <h2>Trained Position</h2>
                <div class="position-check">
                  ${positions.length > 0
                  ? positions.map(el => html`
                   <div class="position-container">
                    <label for="${el.name}">${el.name}</label>
                    <input type="checkbox" name=${el.name}/>
                  </div>
                  `)
                  : html`There are no positions yet!`
                  }
                 
                </div>
               
                </div>
              <button type="submit">Add Employee</button>
            </form>
          </div>
        </section>`;
