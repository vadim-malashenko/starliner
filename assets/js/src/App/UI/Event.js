export default class Event {

    constructor(source) {
        if (typeof source === 'undefined') {
            source = this.constructor
        }
        this.on = this.on.bind(source)
        this.off = this.off.bind(source)
    }

    on(type, handler) {
        this.addEventListener(type, handler)
    }

    off(type, handler) {
        this.removeEventListener(type, handler)
    }

    emit(type, detail) {
        console.log(type)
        dispatchEvent(new CustomEvent(type, {detail}))
    }
}