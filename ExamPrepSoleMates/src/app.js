import { logout } from "./api/user.js";
import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/registrationView.js";
import { showSearch } from "./views/search.js";

const main = document.querySelector('main')

// document.getElementById('logoutBtn').addEventListener('click', onLogout)


page(decorateContent)
page('/', showHome)
page('/catalog', showCatalog)
page('/login', showLogin)
page('/create', showCreate)
page('/details/:id', showDetails)
page('/register', showRegister)
page('/edit/:id', showEdit)
page('/search', showSearch)

updateNav()
page.start()

function decorateContent(ctx, next) {
    ctx.render = renderMain
    ctx.updateNav = updateNav

    const user = getUserData()
    if (user) {
        ctx.user = user
    }

    next()
}

function renderMain(content) {
    render(content, main)
}

