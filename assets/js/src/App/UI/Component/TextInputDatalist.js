import Component from '../Component.js'

export default class TextInputDatalist extends Component{

    #datalist
    #input

    #spinner = /*HTML*/`
        <div class="input-spinner_icon">
            <i class="spinner"></i>
        </div>
    `

    constructor(input, datalist) {
        super(input)
        this.#input = input
        this.#datalist = datalist
    }

    get id() {
        return this.#input.element.id
    }

    get value() {
        return this.#input.element.dataset.id
    }

    list(hash) {
        return this.#datalist.list(hash)
    }

    updateList(ev) {
        const value = ev.target.value
        if (value.length > 2 && /[а-я0-9- ]/i.test(value)) {
            if (this.list(this.hash(value)).length > 0) {
                this.#datalist.element.dataset.target = ev.target.name
            }
        } else {
            this.#datalist.clear()
            this.#input.emit(`${this.#input.element.name}.invalid`, this.id)
        }
    }

    onFocusin(ev) {
        this.updateList(ev)
    }

    async onKeyup(ev) {
        if (typeof ev.key !== 'undefined' && ev.key.length === 1) {
            ev.target.value = ev.target.value.toUpperCase()
            this.updateList(ev)
        }
    }

    onChange(ev) {
        this.updateList(ev)
        const list = this.list(this.hash(ev.target.value))
        const item = list.find(item => item.value === ev.target.value)
        if (typeof item !== 'undefined') {
            ev.target.dataset.id = item.id
            this.#input.emit(`${this.#input.element.id}.valid`, this.id)
        } else {
            ev.target.dataset.id = '0'
            this.#input.emit(`${this.#input.element.id}.invalid`, this.id)
        }
    }

    onload(ev) {
        this.#input.disable()
        this.#input.element.parentElement.insertAdjacentHTML('beforeend', this.#spinner)
        addEventListener('cities.load', ev => {
            this.#input.on('focusin', this.onFocusin.bind(this))
            this.#input.on('keyup', this.onKeyup.bind(this))
            this.#input.on('change', this.onChange.bind(this))
            this.#input.element.parentElement.querySelector(':scope .input-spinner_icon').remove()
            this.#input.enable()
            this.emit(`${this.#input.element.id}.load`)
        })
    }

    hash(value) {
        return value.substr(0, 3).toUpperCase()
    }
}