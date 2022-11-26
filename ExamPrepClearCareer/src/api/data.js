import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/offers?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/offers/' + id)
}

export async function deleteById(id) {
    return del('/data/offers/' + id)
}

export async function createInstance(data) {
    return post('/data/offers', data)
}

export async function editInstance(id, data) {
    return put('/data/offers/' + id, data)
}

export async function search(query) {
    return get(`/data/offers?where=name%20LIKE%20%22${query}%22`)
}

