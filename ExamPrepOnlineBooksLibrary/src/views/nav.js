import { logout } from "../api/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("nav");

const navTemplate = (hasUser, onLogout) => html` 
<section class="navbar-dashboard">
  <a href="/">Dashboard</a>
  ${hasUser ? html`
  <div id="user">
    <span>Welcome, ${hasUser.email}</span>
    <a class="button" href="/my-books">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
  </div>` : html`
  <div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
  </div>`}
</section>`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user, onLogout), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
