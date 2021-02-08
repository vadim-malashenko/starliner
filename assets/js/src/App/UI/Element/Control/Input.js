import Control from '../Control.js'

export default class Input extends Control {
    get value() {
        return this.element.value
    }

    set value(value) {
        this.element.value = value
    }
}