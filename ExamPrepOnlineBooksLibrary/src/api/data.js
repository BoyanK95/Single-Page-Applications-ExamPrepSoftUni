import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/books?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/books/' + id)
}

export async function deleteById(id) {
    return del('/data/books/' + id)
}

export async function createInstance(data) {
    return post('/data/books', data)
}

export async function editInstance(id, data) {
    return put('/data/books/' + id, data)
}

export async function getMyItems(id) {
    return get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
}

