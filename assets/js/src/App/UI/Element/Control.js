import Element from '../Element.js'

export default class Control extends Element {

    constructor(element) {
        super(element)
        addEventListener(`${this.element.id}.invalid`, ev => this.setClass('is-invalid'))
        addEventListener(`${this.element.id}.valid`, ev => this.unsetClass('is-invalid'))
    }

    disable() {
        this.setAttribute('disabled', '')
    }

    enable() {
        this.unsetAttribute('disabled')
    }

    get value() {
        return this.element.value
    }
}