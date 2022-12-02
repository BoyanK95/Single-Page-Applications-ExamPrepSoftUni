import { editInstance, getById } from '../api/data.js'
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js'



const editTemplate = (item, onEdit) => html`
        <section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value=${item.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value=${item.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${item.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${item.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${item.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>`

export async function showEdit(ctx) {
    const id = ctx.params.id
    const item = await getById(id)
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)))

    async function onEdit({ title, imageUrl, category, maxLevel, summary }, form) {
        if (title == '' || imageUrl == '' || category == '' || maxLevel == ''|| summary == '') {
            return alert('All fields must be filled')
        }

        await editInstance(id, {
            title,
            imageUrl,
            category,
            maxLevel,
            summary,
        })
        ctx.page.redirect('/details/' + id)
    }
}