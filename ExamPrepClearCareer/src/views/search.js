import { html, nothing } from '../lib.js'
import { search } from '../api/data.js'


const searchTemplate = (isClicked, showSearch, result, hasUser) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${showSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            ${
                isClicked ?
                result.length > 0 ?
                html`<div class="search-result">
                ${result.map(i => searchedCard(i, hasUser))}`
                    
                 : html`
                 <p class="no-result">No result.</p>
            </div>` : nothing}
        </div>    
        </section>`

const searchedCard = (result, hasUser) => html`
<div class="card-box">
                    <img src=${result.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">${result.name}</p>
                            <p class="artist">${result.artist}</p>
                            <p class="genre">${result.genre}</p>
                            <p class="price">${result.price}</p>
                            <p class="date">${result.releaseDate}</p>
                        </div>
                        ${hasUser ?
                            html`
                            <div class="btn-group">
                                <a href="/details/${result._id}" id="details">Details</a>
                            </div>` : nothing
                        }
                        
                    </div>
                </div>`


export function showSearch(ctx) {
    
    ctx.render(searchTemplate(false, onSearch))

    async function onSearch(e) {
        const searchedInput = document.getElementById('search-input')
        const query = searchedInput.value

        if (!query) {
            return alert('Enter text!')
        }
       const result = await search(query)
    
       ctx.render(searchTemplate(true, onSearch, result, !!ctx.user))
    }
}