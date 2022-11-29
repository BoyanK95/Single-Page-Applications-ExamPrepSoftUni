import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (items, hasUser) => html` 
<section id="dashboard-page">
  <h1 class="title">All Posts</h1>

  <!-- Display a div with information about every post (if any)-->
  ${items.length > 0 ? items.map(i => cardTemplate(i))
    : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
  
</section>`;

const cardTemplate = (item, hasUser) => {
  return html` 
  <div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img
      class="post-image"
      src=${item.imageUrl}
      alt="Kids clothes"
    />
    <div class="btn-wrapper">
      <a href="/details/${item._id}" class="details-btn btn">Details</a>
    </div>
  </div>`;
};

export async function showCatalog(ctx) {
  const items = await getAll();
  const hasUser = !!ctx.user;
  ctx.render(catalogTemplate(items, hasUser));
}
