import { html } from "../../../node_modules/lit-html/lit-html.js";

export const searchTemplate = (fruitData, submitHandler) => html`
  <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${submitHandler}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
<div class="search-result">
${fruitData.length > 0
  ? fruitData.map(el => fruitCard(el))
  : html`<p class="no-result">No result.</p>`}
  </div>
        </section>`;

let fruitCard = (fruitInfo) => html `
 <div class="fruit">
  <img src="${fruitInfo.imageUrl}" alt="example1" />
  <h3 class="title">${fruitInfo.name}</h3>
  <p class="description">${fruitInfo.description}</p>
  <a class="details-btn" href="/details/${fruitInfo._id}">More Info</a>
</div>
`;