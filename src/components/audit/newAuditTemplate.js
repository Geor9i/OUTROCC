import { html } from "../../../node_modules/lit-html/lit-html.js";

export const newAuditTemplate = (members, submitHandler, addMember) => html`
   <section>
        <form class="audit-form" @submit=${submitHandler}>
            <h3>Select shift start & end</h3>
            <div class="audit-shift-period">
                <div class="shift-period-start">
                    <label for="shiftStart">Shift start time</label>
                    <select name="shiftStart" id="shift-start">${timeMap().map(el => html`${el}`)}</select>
                </div>
                <div class="shift-period-start">
                    <label for="shiftEnd">Shift end time</label>
                    <select name="shiftEnd" id="shift-end">${timeMap().map(el => html`${el}`)}</select>
                </div>
            </div>
            <label for="add-member">Select a minimum of 2 team members</label>
            <div class="audit-add-member-container">
            <select name="add-member" class="audit-member-select">
                ${
                members.length > 0
                ? members.map(el => html`<option .value=${el.id}>${el.firstName} ${el.surname}  ==>  ${Object.keys(el.positions).join(', ')}</option>`)
                : html``
                }
            </select>
            <button class="add-member-button" @click=${addMember}>Add</button>
            </div>
            <input class="submit-btn" type="submit" value="Start"/>
        </form>
      </section>`;

        
function timeMap () {
    let timeArr = [];
    for(let i = 0; i < 24; i++) {
        let O = i < 10 ? `0` : ``;
        timeArr.push(html`<option .value="${O}${i}:00">${O}${i}:00</option>`);
        timeArr.push(html`<option .value="${O}${i}:30">${O}${i}:30</option>`);
    }
    return timeArr;
}