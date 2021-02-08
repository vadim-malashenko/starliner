import Element from '../Element.js'

export default class Modal extends Element {

    #modal

    constructor(element) {
        super(element)
        this.#modal = new bootstrap.Modal(element, {backdrop: 'static'})
        this.element.querySelector(':scope header .btn-close').addEventListener('click', this.close.bind(this))
    }

    set header(text) {
        const header = this.element.querySelector(`:scope header`)
        if (header !== null) {
            header.childNodes[0].nodeValue = text
        }
    }

    set body(html) {
        const body = this.element.querySelector(`:scope article`)
        if (body !== null) {
            body.innerHTML = html
        }
    }

    set footer(html) {
        const footer = this.element.querySelector(`:scope footer`)
        if (footer !== null) {
            footer.innerHTML = html
        }
    }

    open() {
        this.#modal.show()
        return this
    }

    close() {
        this.#modal.hide()
        return this
    }
}