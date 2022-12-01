import { logout } from "../api/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("nav");

const navTemplate = (hasUser) => html` 
<a href="#">All games</a>
  <!-- Logged-in users -->
  ${hasUser ? html`
  <div id="user">
    <a href="#">Create Game</a>
    <a href="#">Logout</a>
  </div>`
  : html`
  <div id="guest">
    <a href="#">Login</a>
    <a href="#">Register</a>
  </div>`}`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
