export default class LocalStorage {

    getItem(key) {
        return localStorage.getItem(key)
    }

    setItem(key, value) {
        localStorage.setItem(key, value)
    }
}