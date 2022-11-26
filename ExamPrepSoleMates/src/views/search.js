import { html, nothing } from '../lib.js'
import { search } from '../api/data.js'
import { getUserData } from '../util.js'


const searchTemplate = (isClicked, onSearch, result, user) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button @click=${onSearch} type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              ${isClicked && result.length > 0 ?
              result.map(i => searchedCard(i, user)): html`
              <h2>There are no results found.</h2>`}
            </ul>
          </div>
        </section>`

const searchedCard = (result, hasUser) => html`
            <li class="card">
                <img src=${result.imageUrl} alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${result.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${result.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${result.value}</span></p>
                ${hasUser ? html`
                <a class="details-btn" href="">Details</a>` : nothing}
              </li>`


export function showSearch(ctx) {
    const user = getUserData()
    ctx.render(searchTemplate(false, onSearch))

    async function onSearch(e) {
        e.preventDefault()
        const searchedInput = document.getElementById('#search-input')
        const query = searchedInput.value

        if (!query) {
            return alert('Enter text!')
        }
       const result = await search(query)
        
       ctx.render(searchTemplate(true, onSearch, result ,user))
    }
}