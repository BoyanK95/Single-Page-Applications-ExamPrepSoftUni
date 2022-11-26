import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (items, hasUser) => html` 
        <section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            
            ${items.length > 0 ? items.map(i => cardTemplate(i)) : html`
            <h2>There are no items added yet.</h2>`}
          </ul>    
        </section>`

const cardTemplate = (item, hasUser) => {
  return html`
 <li class="card">
              <img src=${item.imageUrl} alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${item.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
              <a class="details-btn" href="/details/${item._id}">Details</a>
            </li>`
}

export async function showCatalog(ctx) {
  const items = await getAll();
  const hasUser = !!ctx.user
  ctx.render(catalogTemplate(items, hasUser));
}
