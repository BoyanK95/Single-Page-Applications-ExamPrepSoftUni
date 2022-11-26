import {page, render} from './lib.js'
import { renderCatalogView } from './views/catalog.js'
import { renderHomeView } from './views/home.js'

const main = document.querySelector('main')

page(decorateContect)
page('/', renderHomeView)
page('/memes', renderCatalogView)
page('/memes/:id', () => console.log('details'))
page('/edit/:id', () => console.log('edit'))
page('/login', () => console.log('login'))
page('/register', () => console.log('register'))
page('/create', () => console.log('create'))
page('/profile', () => console.log('profile'))


//Start application
page.start()

function decorateContect(ctx, next) {
    ctx.render = renderMain

    next()
}

function renderMain(templateResult) {
    render(templateResult, main)
}

