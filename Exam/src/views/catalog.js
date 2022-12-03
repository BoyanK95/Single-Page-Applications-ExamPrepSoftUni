import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (items, hasUser) => html` 
<section id="dashboard">
  <h2>Albums</h2>
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${items.length > 0 ? items.map(i => cardTemplate(i)) 
      : html`<h2>There are no albums added yet.</h2>`}
    
  </ul>

  <!-- Display an h2 if there are no posts -->
  
</section>`;

const cardTemplate = (item, hasUser) => {
  return html` 
  <li class="card">
      <img src=${item.imageUrl} alt="travis" />
      <p>
        <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
      </p>
      <p><strong>Album name: </strong><span class="album">${item.album}</span></p>
      <p>
        <strong>Sales:</strong
        ><span class="sales">${item.sales}</span>
      </p>
      <a class="details-btn" href="/details/${item._id}">Details</a>
    </li>>`;
};

export async function showCatalog(ctx) {
  const items = await getAll();
  const hasUser = !!ctx.user;
  ctx.render(catalogTemplate(items, hasUser));
}
