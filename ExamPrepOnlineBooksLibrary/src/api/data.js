import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function getById(id) {
    return get('/data/albums/' + id)
}

export async function deleteById(id) {
    return del('/data/albums/' + id)
}

export async function createInstance(data) {
    return post('/data/albums', data)
}

export async function editInstance(id, data) {
    return put('/data/albums/' + id, data)
}

export async function getMyItems(query) {
    return get(`/data/books?where=_ownerId%3D%22${query}%22&sortBy=_createdOn%20desc`)
}

