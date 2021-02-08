import Event from './Event.js'

export default class Component extends Event {

    #ids

    constructor(... ids) {
        super()
        this.#ids = ids
        addEventListener('load', this.onload.bind(this))
    }

    get _() {
        return this.constructor
    }

    get ids() {
        return this.#ids
    }

    disable() {
        this.ids.forEach(el => el.disable())
    }

    enable() {
        this.ids.forEach(el => el.enable())
    }

    waitAll(type, ids, then) {
        Promise.all(ids.map(id => new Promise(r => addEventListener(`${id}.${type}`, r)))).then(then)
    }

    waitAny(type, ids, then) {
        Promise.any(ids.map(id => new Promise(r => addEventListener(`${id}.${type}`, r)))).then(then)
    }

    onValid(ev) {
        this.emit(`${this._.name}.valid`)
        this.waitAny('invalid', this.ids, this.onInvalid)
    }

    onInvalid(ev) {
        this.emit(`${this._.name}.invalid`)
        this.waitAll('valid', [ev.detail.id], this.onValid)
    }

    async onload(ev) {
        this.waitAll('load', this.ids, ev => this.emit(`${this._.name}.load`))
    }
}