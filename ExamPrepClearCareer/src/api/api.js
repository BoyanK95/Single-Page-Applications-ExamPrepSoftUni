import { getUserData } from "../util.js"

const host = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers : {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    const user = getUserData()

    if (user) {
        options.headers['X-Authorization'] = user.accessToken
    }
    try {
        const responce = await fetch(host + url, options)
        
        if (responce.status === 204) {
            return responce
        }

        const result = await responce.json()

        if (responce.ok == false) {
            throw new Error(result.message)
        }
        return result

    } catch (error) {
        alert(error.message)
        throw error
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')