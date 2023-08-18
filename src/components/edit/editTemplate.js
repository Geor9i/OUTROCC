import { html } from "../../../node_modules/lit-html/lit-html.js";

export const editTemplate = (employee, submitHandler) => html`
<section id="edit">
  <div class="form">
    <h2>Edit Employee</h2>
    <form class="edit-form" @submit=${(e) => submitHandler(e, fruitData._id)}>
      <input
        type="text"
        name="first-name"
        placeholder="First Name"
        .value="${employee.firstName}"
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        .value="${employee.surname}"
      />
      <div class="form-checklist">
      <h2>Trained Position</h2>
      <div class="position-check">
        <label for="FOH">FOH</label>
        <input type="checkbox" name="FOH" ${employee.FOH ? html`checked` : html``} />
        <label for="FOH">MOH</label>
        <input type="checkbox" name="MOH" ${employee.MOH ? html`checked` : html``}/>
        <label for="FOH">BOH</label>
        <input type="checkbox" name="BOH" ${employee.BOH ? html`checked` : html``}/>
      </div>
     
      
      <button type="submit">post</button>
    </form>
  </div>
</section>
`;

