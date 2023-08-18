import { html } from "../../../node_modules/lit-html/lit-html.js";

export const dashBoardTemplate = (fruitData) => 
    html`
    <h2>Employees</h2>
    <section id="dashboard">
        ${fruitData.length === 0 
        ? html`<h2>No fruit info yet.</h2>`
        : fruitData.map(el => fruitCardTemplate(el))
        }
    </section>
    `

let fruitCardTemplate = (fruitInfo) => html`

<div class="fruit">
        <img src="${fruitInfo.imageUrl}" alt="example1" />
        <h3 class="title">${fruitInfo.name}</h3>
        <p class="description">${fruitInfo.description}</p>
        <a class="details-btn" href="/details/${fruitInfo._id}">More Info</a>
      </div>`