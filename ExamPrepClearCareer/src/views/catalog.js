import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (items, hasUser) => html` 
        <section id="dashboard">
          <h2>Job Offers</h2>
     
         ${items.length > 0 ? items.map( i => cardTemplate(i)) :
        html`<h2>No offers yet.</h2>`}
          
        </section>>`

const cardTemplate = (item, hasUser) => {
  return html`
  <div class="offer">
            <img src=${item.imageUrl} alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${item.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
          </div>`
}

export async function showCatalog(ctx) {
  const items = await getAll();
  const hasUser = !!ctx.user
  ctx.render(catalogTemplate(items, hasUser));
}
