import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/posts?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/posts/' + id)
}

export async function deleteById(id) {
    return del('/data/posts/' + id)
}

export async function createInstance(data) {
    return post('/data/posts', data)
}

export async function editInstance(id, data) {
    return put('/data/posts/' + id, data)
}

export async function search(query) {
    return get(`/data/posts?where=name%20LIKE%20%22${query}%22`)
}

