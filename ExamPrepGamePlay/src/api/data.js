import { setUserData } from "../util.js";
import { post, get, del, put } from "./api.js";

export async function getAll() {
    return get('/data/games?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/games/' + id)
}

export async function deleteById(id) {
    return del('/data/games/' + id)
}

export async function createInstance(data) {
    return post('/data/games', data)
}

export async function editInstance(id, data) {
    return put('/data/games/' + id, data)
}

export async function getAllRecent() {
    return get(`/data/games?sortBy=_createdOn%20desc&distinct=category`)
}

export async function getComments(id) {
    return get(`/data/comments?where=gameId%3D%22${id}%22`)
}

export async function postComments(id, content) {
    const {_id, comment} = await post('/data/comments', {id, content})

    setUserData({
        _id,
        comment
    })
}