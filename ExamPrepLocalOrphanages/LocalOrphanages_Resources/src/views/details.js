import { deleteById, getById } from '../api/data.js'
import { html, nothing } from '../lib.js'

const detailsTemplate = (item, isOwner, onDelete) => html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${item.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${item.name}</h1>
                        <h3>Artist: ${item.artist}</h3>
                        <h4>Genre: ${item.genre}</h4>
                        <h4>Price: ${item.price}</h4>
                        <h4>Date: ${item.releaseDate}</h4>
                        <p>Description: ${item.description}</p>
                    </div>

                          <!-- Only for registered user and creator of the album-->
                    ${isOwner ?
                    html`
                    <div class="actionBtn">
                        <a href="/edit/${item._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`:
                    nothing}
                  
                    
                </div>
            </div>
        </section>`

function itemControls(item, hasUser, onDelete) {
    if (hasUser == false) {
        return nothing
    }

    if (isOwner) {
        return html`
         <div class="actionBtn">
            <a href="/edit/${item._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`
    }

}


export async function showDetails(ctx) {
    const id = ctx.params.id
    const item = await getById(id)
    
    const hasUser = Boolean(ctx.user)
    const isOwner = hasUser && ctx.user._id == item._ownerId
    
    ctx.render(detailsTemplate(item,isOwner, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this')
        
        if (choice) {
            await deleteById(id)
            ctx.page.redirect('/catalog')
        }
    }
}