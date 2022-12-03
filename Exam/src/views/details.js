import { deleteById, getById } from '../api/data.js'
import { getLikesforUser, getTotalLikes, like } from '../api/likes.js'
import { html, nothing } from '../lib.js'

const detailsTemplate = (item, isOwner, hasUser, onDelete, likePost, likes) => html`
        <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${item.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${item.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${likes ? likes : 0}</span></div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${isOwner ? html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}
            ${hasUser && !isOwner ? html`
            <a @click=${likePost} href="javascript:void(0)" id="like-btn">Like</a>` : nothing}
          </div>
        </div>
      </section>`



export async function showDetails(ctx) {
    const id = ctx.params.id
    const item = await getById(id)
    
    const hasUser = Boolean(ctx.user)
    const isOwner = hasUser && ctx.user._id == item._ownerId
    
    ctx.render(detailsTemplate(item, isOwner,hasUser, onDelete, likePost))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this')
        
        if (choice) {
            await deleteById(id)
            ctx.page.redirect('/catalog')
        }
    }
  
   async function likePost() {
    debugger
    userId = ctx.user._id
    console.log(userId);
    await like(id)
    const likes = await getTotalLikes(ctx.params.id)
    hasLiked = await getLikesforUser()
    ctx.render(detailsTemplate(item, isOwner,hasUser, onDelete, likePost, likes + 1))
  }
}