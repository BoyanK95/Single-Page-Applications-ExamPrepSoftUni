import { logout } from "../api/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("nav");

const navTemplate = (hasUser) => html` 
<section class="navbar-dashboard">
  <a href="#">Dashboard</a>
  <!-- Guest users -->
  <!-- Logged-in users -->
  ${hasUser ? html`
  <div id="user">
    <span>Welcome, {email}</span>
    <a class="button" href="#">My Books</a>
    <a class="button" href="#">Add Book</a>
    <a class="button" href="#">Logout</a>
  </div>` : html`
  <div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
  </div>`}
</section>`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
