import { logout } from "../api/user.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("header");

const navTemplate = (hasUser) => html` <nav>
  <section class="logo">
    <img src="./images/logo.png" alt="logo" />
  </section>
  <ul>
    <!--Users and Guest-->
    <li><a href="/">Home</a></li>
    <li><a href="/catalog">Dashboard</a></li>
    ${!hasUser
      ? html` <li><a class="guest" href="/login">Login</a></li>
          <li><a class="guest" href="/register">Register</a></li>`
      : html` <li><a class="user" href="/create">Create Postcard</a></li>
          <li>
            <a class="user" @click=${onLogout} id="logoutBtn" href="/javascript:void(0)">Logout</a>
          </li>`}
    <!--Only Guest-->

    <!--Only Users-->
  </ul>
</nav>`;

export function updateNav() {
    const user = getUserData()

    render(navTemplate(user), nav);
}


function onLogout() {
    logout()
    updateNav()
    page.redirect('/')
}