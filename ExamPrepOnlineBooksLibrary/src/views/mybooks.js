import { getAll, getMyItems } from "../api/data.js";
import { html, nothing } from "../lib.js";

const myBooksTemplate = (items) => html` 
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            ${items.length > 0 ? html`
            <ul class="my-books-list">
                ${items.map( i => myBookCard(i))}
            </ul>` : html`<p class="no-books">No books in database!</p>`}
        </section>`;

const myBookCard = (item) => {
  return html` 
  <li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl} /></p>
    <a class="button" href="/details/${item._id}">Details</a>
  </li>`;
};

export async function showMyBooks(ctx) {
    const items = await getMyItems(ctx.user._id);
  ctx.render(myBooksTemplate(items));
}
