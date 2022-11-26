import { editInstance, getById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onEdit} class="edit-form">
      <input type="text" name="brand" id="shoe-brand" placeholder=${item.brand} .value=${item.brand}/>
      <input type="text" name="model" id="shoe-model" placeholder=${item.model} .value=${item.model} />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder=${item.imageUrl}
        .value=${item.imageUrl}
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder=${item.release}
        .value=${item.release}
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder=${item.designer}
        .value=${item.designer}
      />
      <input type="text" name="value" id="shoe-value" placeholder=${item.value} .value=${item.value}/>

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const item = await getById(id);
  ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

  async function onEdit(
    { brand, imageUrl,model, release, designer, value},  form
  ) {
    if (
        brand == "" ||
      imageUrl == "" ||
      release == "" ||
      designer == "" ||
      model == "" ||
      value == "" ) {
      return alert("All fields must be filled");
    }

    await editInstance(id, {
        brand,
      imageUrl,
      model,
      release,
      designer,
      value,
      });
    ctx.page.redirect("/details/" + id);
  }
}
