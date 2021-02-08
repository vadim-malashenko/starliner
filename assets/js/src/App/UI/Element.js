import Event from './Event.js'
import Template from './Template.js'

export default class Element extends Event {

    #element

    constructor(id) {

        const element = document.getElementById(id)

        super(element)

        this.#element = element
    }

    static factory(elementClass, ... args) {
        return {
            byID: id => new elementClass(document.getElementById(id), ... args),
            fromTemplate: (template, id, attrs) => {
                document.body.insertAdjacentHTML('beforeend', new Template(template).html({id, ... attrs}))
                const element = document.getElementById(id)
                return new elementClass(element, ... args)
            }
        }
    }

    get element() {
        return this.#element
    }

    get inner() {
        return this.element.innerHTML
    }

    set inner(html) {
        this.element.innerHTML = html
    }

    getClassList() {
        return this.element.classList
    }

    setClass(name) {
        this.element.classList.add(name)
    }

    unsetClass(name) {
        this.element.classList.remove(name)
    }

    hasClass(name) {
        return this.getClassList().contains(name)
    }

    getAttribute(name) {
        return this.element.getAttribute(name)
    }

    setAttribute(name, value) {
        this.element.setAttribute(name, value)
    }

    unsetAttribute(name) {
        this.element.removeAttribute(name)
    }

    hasAttribute(name) {
        return this.getAttribute(name) !== null
    }

    hide() {
        this.setAttribute('hidden', '')
    }

    show() {
        this.unsetAttribute('hidden')
    }
}