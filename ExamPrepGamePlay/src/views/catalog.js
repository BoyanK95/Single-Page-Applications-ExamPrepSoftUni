import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (items, hasUser) => html` <section id="catalog-page">
  <h1>All Games</h1>
  <!-- Display div: with information about every game (if any) -->
  ${items.length > 0 ? items.map( i => cardTemplate(i)) :html`
  <h3 class="no-articles">No articles yet</h3>` }

  <!-- Display paragraph: If there is no games  -->
  
</section>`;

const cardTemplate = (item, hasUser) => {
  return html` 
  <div class="card-box">
    <div class="allGames">
      <div class="allGames-info">
        <img src=${item.imageUrl} />
        <h6>${item.category}</h6>
        <h2>${item.title}</h2>
        <a href="/details/${item._id}" class="details-button">Details</a>
      </div>
    </div>
  </div>`;
};

export async function showCatalog(ctx) {
  const items = await getAll();
  const hasUser = !!ctx.user;
  ctx.render(catalogTemplate(items, hasUser));
}
