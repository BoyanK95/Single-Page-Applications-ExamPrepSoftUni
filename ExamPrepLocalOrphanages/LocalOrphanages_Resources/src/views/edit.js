import { editInstance, getById } from '../api/data.js'
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js'



const editTemplate = (item, onEdit) => html`
               <section class="editPage">
            <form @submit=${onEdit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" .value=${item.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${item.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value=${item.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${item.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value=${item.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value=${item.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${item.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`

export async function showEdit(ctx) {
    const id = ctx.params.id
    const item = await getById(id)
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)))

    async function onEdit({ name, imgUrl, price, releaseDate, artist, genre, description}, form) {
        if (name == '' || imgUrl == '' || price == '' || releaseDate == '' || artist == '' || genre == '' || description == '') {
            return alert('All fields must be filled')
        }

        await editInstance(id, {
            name,
            imgUrl,
            price,
            releaseDate,
            imgUrl,
            artist,
            genre,
            description,
        })
        ctx.page.redirect('/details/' + id)
    }
}