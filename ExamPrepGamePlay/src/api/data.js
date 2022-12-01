import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/games?sortBy=_createdOn%20desc')
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

export async function getAllRecent() {
    return get(`/data/games?sortBy=_createdOn%20desc&distinct=category`)
}

