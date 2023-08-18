import { html } from "../../../node_modules/lit-html/lit-html.js";

export const detailsTemplate = (fruitInfo, isOwner, deleteHandler) => 
    html`
    <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${fruitInfo.imageUrl} alt="Unavailable" />
      <p id="details-title">${fruitInfo.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${fruitInfo.description}</p>
              <p id="nutrition">Nutrition</p>
             <p id = "details-nutrition">${fruitInfo.nutrition}</p>
        </div>
        <div id="action-buttons">
            <a href="/edit/${fruitInfo._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${(e) => deleteHandler(e, fruitInfo._id)} >Delete</a>
        </div>
      </div>
  </div>
</section>`;