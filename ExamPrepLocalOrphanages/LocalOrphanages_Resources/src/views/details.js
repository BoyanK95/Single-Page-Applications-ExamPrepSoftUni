import { deleteById, getById } from '../api/data.js'
import { html, nothing } from '../lib.js'

const detailsTemplate = (item, isOwner, hasUser, onDelete) => html`
       <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="./images/clothes.jpeg" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">Description: ${item.description}</p>
                        <p class="post-address">${item.address}</p>
                        <p class="post-number">${item.phone}</p>
                        <p class="donate-Item">Donate Materials: 0</p>
                        <div class="btns">
                            <!--Edit and Delete are only for creator-->
                            ${isOwner ? html`
                            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : nothing}
                            ${hasUser ? html`
                            <a href="#" class="donate-btn btn">Donate</a>` : nothing}                            
                        </div>
                    </div>
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
    
    ctx.render(detailsTemplate(item, isOwner, hasUser, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this')
        
        if (choice) {
            await deleteById(id)
            ctx.page.redirect('/catalog')
        }
    }
}