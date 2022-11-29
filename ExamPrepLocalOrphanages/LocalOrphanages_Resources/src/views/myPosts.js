import { html } from "../lib.js";
import { viewMyPosts } from "../api/data.js";

const myPostsTemplate = (items) => html` 
<section id="my-posts-page">
  <h1 class="title">My Posts</h1>
  <div class="my-posts">
    ${items.length > 0 ? items.map(i => myPostCard(i))
    : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`;

const myPostCard = (item) => {
  return html` 
  <div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img class="post-image" src=${item.imageUrl} alt="Material Image" />
    <div class="btn-wrapper">
      <a href="#" class="details-btn btn">Details</a>
    </div>
  </div>`;
};

export async function showMyPosts(ctx) {
  const items = await viewMyPosts(ctx.user._id);
  ctx.render(myPostsTemplate(items));
}
