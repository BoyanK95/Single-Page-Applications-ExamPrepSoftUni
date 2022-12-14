import { deleteById, getById, getComments, postComments } from '../api/data.js'
import { html, nothing } from '../lib.js'
import { createSubmitHandler } from '../util.js'

const detailsTemplate = (item, isOwner, hasUser, comments, onDelete, onComment) => html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="images/MineCraft.png" />
                    <h1>${item.title}</h1>
                    <span class="levels">MaxLevel: ${item.maxLevel}</span>
                    <p class="type">${item.category}</p>
                </div>
                <p class="text">
                ${item.summary}
                </p>
                <!-- Bonus ( for Guests and Users ) -->
                ${!isOwner ? html`
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        <li class="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                    <p class="no-comment">No comments.</p>
                </div>` : nothing}
                
                 <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${isOwner ? html`<div class="buttons">
                    <a href="/edit/${item._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>` : nothing}
            </div>
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${hasUser && !isOwner ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>` : nothing}
        </section>`

const commentCard = (comment) => {
    return html`
    <li class="comment">
        <p>Content: ${comment._id}</p>
    </li>`
}

export async function showDetails(ctx) {
    const id = ctx.params.id
    const item = await getById(id)
    const comments = await getComments(id)
    
    const hasUser = Boolean(ctx.user)
    const isOwner = hasUser && ctx.user._id == item._ownerId
    
    ctx.render(detailsTemplate(item,isOwner, hasUser, comments, createSubmitHandler(onDelete) , createSubmitHandler(onComment)))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this')
        
        if (choice) {
            await deleteById(id)
            ctx.page.redirect('/catalog')
        }
    }

    async function onComment(content) {
        debugger
        const id = ctx.params.id
        await postComments(id, content)
    }
}