import Http from './Http.js'
import ObjectCache from './Cache/ObjectCache.js'

export default class Service {

    #http
    #cache

    constructor() {
        this.#http = Http
        this.#cache = new ObjectCache()
    }

    async get (data) {
        let url = this.constructor.URL
        if (typeof data === 'object') {
            url += `?${new URLSearchParams(data)}`
        }
        let value = this.#cache.getItem(url)
        if (typeof value === 'undefined') {
            value = await this.#http.get(url)
            if (typeof value.error === 'undefined') {
                this.#cache.setItem(url, value)
            }
        }
        return value
    }
}