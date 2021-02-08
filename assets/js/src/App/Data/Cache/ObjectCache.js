export default class ObjectCache {

    #store = {}

    getItem(key) {
        return this.#store[key]
    }

    setItem(key, value) {
        this.#store[key] = value
    }
}